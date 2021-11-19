const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    return { status: StatusCodes.BAD_REQUEST, message: '"name" is required' };
  }

  const user = await Category.create({ name });
  return { status: StatusCodes.CREATED, user };
};

module.exports = {
  create,
};