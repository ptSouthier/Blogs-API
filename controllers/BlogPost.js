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

module.exports = {
  create,
};