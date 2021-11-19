const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const create = async ({ displayName, email, password, image }) => {
  const checkEmail = await User.findOne({ where: { email } });
  const { JWT_SECRET } = process.env;

  if (checkEmail) {
    return { status: StatusCodes.CONFLICT, message: 'User already registered' };
  }

  await User.create({ displayName, email, password, image });
  const token = jwt.sign({ displayName, email }, JWT_SECRET, { expiresIn: '12h' });
  return { status: StatusCodes.CREATED, token };
};

module.exports = {
  create,
};