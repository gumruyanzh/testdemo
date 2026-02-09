const nodemailer = require('nodemailer');

const createTransporter = () => {
  // For development, use ethereal email (fake SMTP)
  // For production, use actual SMTP credentials from .env
  if (process.env.NODE_ENV === 'production' && process.env.EMAIL_HOST) {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // For testing, we'll just log the email content
  return {
    sendMail: async (options) => {
      console.log('\n=== EMAIL SENT ===');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('HTML:', options.html);
      console.log('==================\n');
      return { messageId: 'test-' + Date.now() };
    }
  };
};

const sendVerificationEmail = async (user, token) => {
  const transporter = createTransporter();
  const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@testdemo.com',
    to: user.email,
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to TestDemo!</h2>
        <p>Hi ${user.name},</p>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}"
             style="background-color: #4CAF50; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">TestDemo Authentication System</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (user, token) => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@testdemo.com',
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}"
             style="background-color: #2196F3; color: white; padding: 14px 28px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #999; font-size: 12px;">TestDemo Authentication System</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
