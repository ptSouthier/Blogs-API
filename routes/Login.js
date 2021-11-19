const router = require('express').Router();
const Login = require('../controllers/Login');
const {
  validateEmail,
  validatePassword,
  } = require('../middlewares/validations');

router.post('/', validateEmail, validatePassword, Login.authenticate);

module.exports = router;