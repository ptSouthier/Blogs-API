const { StatusCodes } = require('http-status-codes');
const { BlogPost, Category, User } = require('../models');

const create = async ({ title, content, categoryIds, email }) => {
  const getUser = await User.findOne({ where: { email } });
  const verifyCategoryIds = await Category.findOne({ where: { id: categoryIds } });

  if (!verifyCategoryIds) {
    return { status: StatusCodes.BAD_REQUEST, message: '"categoryIds" not found' };
  }
  const post = await BlogPost.create({ title, content, categoryIds, userId: getUser.id });
  return { status: StatusCodes.CREATED, post };
};

module.exports = {
  create,
};