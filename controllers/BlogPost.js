const BlogPost = require('../services/BlogPost');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const { post, status, message } = await BlogPost.create({ title, content, categoryIds, email });

  if (message) {
    return res.status(status).json({ message });
  }
  
  res.status(status).json(post);
};

const getAll = async (req, res) => {
  const { status, posts } = await BlogPost.getAll();

  res.status(status).json(posts);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { post, status, message } = await BlogPost.getByID(id);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const { post, status, message } = await BlogPost.update({
    id, title, content, categoryIds, email,
  });

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(post);
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
};