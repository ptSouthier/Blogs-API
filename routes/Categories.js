const router = require('express').Router();
const Categories = require('../controllers/Categories');
const { validateJWT } = require('../middlewares/validateJWT');

router.post('/', validateJWT, Categories.create);

router.get('/', validateJWT, Categories.getAll);

module.exports = router;