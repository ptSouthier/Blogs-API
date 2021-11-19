const router = require('express').Router();
const Categories = require('../controllers/Categories');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/', validateJWT, Categories.create);

module.exports = router;