const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const authenticate = async ({ email, password }) => {
  const getUser = await User.findOne({ where: { email, password } });
  const { JWT_SECRET } = process.env;

  if (!getUser) {
    return { status: StatusCodes.BAD_REQUEST, message: 'Invalid fields' };
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '12h' });
  return { status: StatusCodes.OK, token };
};

module.exports = {
  authenticate,
};