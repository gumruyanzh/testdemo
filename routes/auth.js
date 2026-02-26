const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateJWT, generateVerificationToken, generateResetToken } = require('../utils/token');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');
const { authenticateToken } = require('../middleware/auth');

// Register page
router.get('/register', (req, res) => {
  res.render('register', { errors: [], formData: {} });
});

// Register user
router.post('/register', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('register', {
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render('register', {
        errors: [{ msg: 'Email already registered' }],
        formData: req.body
      });
    }

    // Create verification token
    const verificationToken = generateVerificationToken();

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      verificationToken
    });

    // Send verification email
    await sendVerificationEmail(user, verificationToken);

    res.render('message', {
      title: 'Registration Successful',
      message: `Thank you for registering! We've sent a verification email to ${email}. Please check your inbox and verify your email address.`,
      redirectUrl: '/login',
      redirectText: 'Go to Login'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', {
      errors: [{ msg: 'An error occurred during registration. Please try again.' }],
      formData: req.body
    });
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { errors: [], formData: {} });
});

// Login user
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('login', {
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', {
        errors: [{ msg: 'Invalid email or password' }],
        formData: req.body
      });
    }

    // Generate JWT token
    const token = generateJWT(user.id);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.redirect('/profile');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', {
      errors: [{ msg: 'An error occurred during login. Please try again.' }],
      formData: req.body
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

// Verify email
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.render('error', {
        message: 'Invalid verification link',
        redirectUrl: '/'
      });
    }

    const user = await User.findOne({ where: { verificationToken: token } });

    if (!user) {
      return res.render('error', {
        message: 'Invalid or expired verification token',
        redirectUrl: '/'
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.render('message', {
      title: 'Email Verified',
      message: 'Your email has been successfully verified! You can now access all features.',
      redirectUrl: '/login',
      redirectText: 'Go to Login'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.render('error', {
      message: 'An error occurred during email verification',
      redirectUrl: '/'
    });
  }
});

// Forgot password page
router.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { errors: [], formData: {} });
});

// Forgot password handler
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('forgot-password', {
      errors: errors.array(),
      formData: req.body
    });
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    // Always show success message for security (don't reveal if email exists)
    if (!user) {
      return res.render('message', {
        title: 'Reset Email Sent',
        message: 'If an account exists with this email, you will receive password reset instructions.',
        redirectUrl: '/login',
        redirectText: 'Go to Login'
      });
    }

    // Generate reset token
    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(user, resetToken);

    res.render('message', {
      title: 'Reset Email Sent',
      message: 'If an account exists with this email, you will receive password reset instructions.',
      redirectUrl: '/login',
      redirectText: 'Go to Login'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.render('forgot-password', {
      errors: [{ msg: 'An error occurred. Please try again.' }],
      formData: req.body
    });
  }
});

// Reset password page
router.get('/reset-password', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.render('error', {
        message: 'Invalid reset link',
        redirectUrl: '/forgot-password'
      });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: token
      }
    });

    if (!user || user.resetPasswordExpires < new Date()) {
      return res.render('error', {
        message: 'Invalid or expired reset token',
        redirectUrl: '/forgot-password'
      });
    }

    res.render('reset-password', { errors: [], token });
  } catch (error) {
    console.error('Reset password page error:', error);
    res.render('error', {
      message: 'An error occurred',
      redirectUrl: '/forgot-password'
    });
  }
});

// Reset password handler
router.post('/reset-password', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], async (req, res) => {
  const errors = validationResult(req);
  const { token } = req.body;

  if (!errors.isEmpty()) {
    return res.render('reset-password', {
      errors: errors.array(),
      token
    });
  }

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token
      }
    });

    if (!user || user.resetPasswordExpires < new Date()) {
      return res.render('error', {
        message: 'Invalid or expired reset token',
        redirectUrl: '/forgot-password'
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.render('message', {
      title: 'Password Reset Successful',
      message: 'Your password has been successfully reset. You can now login with your new password.',
      redirectUrl: '/login',
      redirectText: 'Go to Login'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.render('reset-password', {
      errors: [{ msg: 'An error occurred. Please try again.' }],
      token
    });
  }
});

// Profile page (protected)
router.get('/profile', authenticateToken, async (req, res) => {
  res.render('profile', { user: req.user });
});

// Update profile
router.post('/profile', authenticateToken, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('profile', {
      user: req.user,
      errors: errors.array()
    });
  }

  try {
    req.user.name = req.body.name;
    await req.user.save();

    res.render('profile', {
      user: req.user,
      success: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.render('profile', {
      user: req.user,
      errors: [{ msg: 'An error occurred while updating profile' }]
    });
  }
});

// Resend verification email
router.post('/resend-verification', authenticateToken, async (req, res) => {
  try {
    if (req.user.isVerified) {
      return res.json({ success: false, message: 'Email already verified' });
    }

    const verificationToken = generateVerificationToken();
    req.user.verificationToken = verificationToken;
    await req.user.save();

    await sendVerificationEmail(req.user, verificationToken);

    res.json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ success: false, message: 'Failed to send verification email' });
  }
});

module.exports = router;
