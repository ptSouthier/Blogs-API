const User = require('../services/User');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { token, status, message } = await User.create({ displayName, email, password, image });

  if (message) {
    return res.status(status).json({ message });
  }
  
  res.status(status).json(token);
};

module.exports = {
  create,
};