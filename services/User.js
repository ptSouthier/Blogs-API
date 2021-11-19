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
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '12h' });
  return { status: StatusCodes.CREATED, token };
};

const getAll = async () => {
  const users = await User.findAll({});
  return { status: StatusCodes.OK, users };
};

const getByID = async (id) => {
  const user = await User.findOne({ where: { id } });
  
  if (!user) {
    return { status: StatusCodes.NOT_FOUND, message: 'User does not exist' };
  }

  return { status: StatusCodes.OK, user };
};

const remove = async (email) => {
  await User.destroy({ where: { email } });
  return { status: StatusCodes.NO_CONTENT };
};

module.exports = {
  create,
  getAll,
  getByID,
  remove,
};