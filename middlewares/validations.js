const { StatusCodes } = require('http-status-codes');

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  const MIN_NAME_LENGTH = 8;

  if (displayName.length < MIN_NAME_LENGTH) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const isEmailValid = emailPattern.test(email);

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"email" is required',
    });
  }

  if (!isEmailValid) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"email" must be a valid email',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const PASSWORD_LENGTH = 6;

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"password" is required',
    });
  }

  if (password.length < PASSWORD_LENGTH || password.length > PASSWORD_LENGTH) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};