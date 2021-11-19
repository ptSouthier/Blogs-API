const Login = require('../services/Login');

const authenticate = async (req, res) => {
  const { email, password } = req.body;
  const { token, status, message } = await Login.authenticate({ email, password });

  if (message) {
    return res.status(status).json({ message });
  }
  
  res.status(status).json(token);
};

module.exports = {
  authenticate,
};