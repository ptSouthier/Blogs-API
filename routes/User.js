const router = require('express').Router();
const User = require('../controllers/User');
const { validateJWT } = require('../middlewares/validateJWT');
const {
   validateName,
   validateEmail,
   validatePassword,
  } = require('../middlewares/validations');

router.post('/', validateName, validateEmail, validatePassword, User.create);

router.get('/', validateJWT, User.getAll);

module.exports = router;