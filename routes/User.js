const router = require('express').Router();
const User = require('../controllers/User');
const {
   validateName,
   validateEmail,
   validatePassword,
  } = require('../middlewares/validations');

router.post('/', validateName, validateEmail, validatePassword, User.create);

module.exports = router;