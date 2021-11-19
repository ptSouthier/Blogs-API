const { StatusCodes } = require('http-status-codes');

const EMPTY_ENTRY = 0;

const isEmailValid = (email) => {
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return emailPattern.test(email);
};

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
  
  if (email.length === EMPTY_ENTRY) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"email" is not allowed to be empty',
    });
  }

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"email" is required',
    });
  }

  if (!isEmailValid(email)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"email" must be a valid email',
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const PASSWORD_LENGTH = 6;

  if (password.length === EMPTY_ENTRY) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"password" is not allowed to be empty',
    });
  }

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