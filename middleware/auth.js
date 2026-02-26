const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).render('error', {
        message: 'Access denied. Please login.',
        redirectUrl: '/login'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).render('error', {
        message: 'User not found. Please login again.',
        redirectUrl: '/login'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).render('error', {
      message: 'Invalid or expired token. Please login again.',
      redirectUrl: '/login'
    });
  }
};

const requireVerified = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.render('error', {
      message: 'Please verify your email address first.',
      redirectUrl: '/profile'
    });
  }
  next();
};

module.exports = { authenticateToken, requireVerified };
