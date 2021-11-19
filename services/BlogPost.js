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

const getAll = async () => {
  const posts = await BlogPost.findAll({ include: [{ all: true }] });
  console.log(posts);

  return { status: StatusCodes.OK, posts };
};

const getByID = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ all: true }],
  });

  if (!post) {
    return { status: StatusCodes.NOT_FOUND, message: 'Post does not exist' };
  }

  return { status: StatusCodes.OK, post };
};

module.exports = {
  create,
  getAll,
  getByID,
};