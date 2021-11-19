const { StatusCodes } = require('http-status-codes');
const { Category } = require('../models');

const create = async ({ name }) => {
  if (!name) {
    return { status: StatusCodes.BAD_REQUEST, message: '"name" is required' };
  }

  const category = await Category.create({ name });
  return { status: StatusCodes.CREATED, category };
};

const getAll = async () => {
  const categories = await Category.findAll({});
  return { status: StatusCodes.OK, categories };
};

module.exports = {
  create,
  getAll,
};