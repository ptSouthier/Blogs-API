const User = require('../services/User');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { token, status, message } = await User.create({ displayName, email, password, image });

  if (message) {
    return res.status(status).json({ message });
  }
  
  res.status(status).json(token);
};

const getAll = async (_req, res) => {
  const { status, users } = await User.getAll();

  res.status(status).json(users);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const { status, user, message } = await User.getByID(id);

  if (message) {
    return res.status(status).json({ message });
  }

  res.status(status).json(user);
};

const remove = async (req, res) => {
  const { email } = req.user;
  const { status } = await User.remove(email);

  res.status(status).send();
};

module.exports = {
  create,
  getAll,
  getByID,
  remove,
};