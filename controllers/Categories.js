const Categories = require('../services/Categories');

const create = async (req, res) => {
  const { name } = req.body;
  const { user, status, message } = await Categories.create({ name });

  if (message) {
    return res.status(status).json({ message });
  }
  
  res.status(status).json(user);
};

module.exports = {
  create,
};