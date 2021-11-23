const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const { JWT_SECRET } = process.env;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const email = jwt.verify(token, JWT_SECRET);
    req.user = email;
    next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  validateJWT,
};