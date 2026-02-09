const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateJWT = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateJWT,
  generateVerificationToken,
  generateResetToken
};
