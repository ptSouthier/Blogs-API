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

const update = async ({ id, title, content, categoryIds, email }) => {
  const post = await BlogPost.findOne({ where: { id }, include: [{ all: true }] });
  const { dataValues } = post;
  
  if (categoryIds) {
    return { status: StatusCodes.BAD_REQUEST, message: 'Categories cannot be edited' };
  }

  if (dataValues.user.email !== email) {
    return { status: StatusCodes.UNAUTHORIZED, message: 'Unauthorized user' };
  }

  if (!title) {
    return { status: StatusCodes.BAD_REQUEST, message: '"title" is required' };
  }

  if (!content) {
    return { status: StatusCodes.BAD_REQUEST, message: '"content" is required' };
  }

  const newPost = await post.update({ title, content }, { where: { id } });
  return { status: StatusCodes.OK, post: newPost };
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};