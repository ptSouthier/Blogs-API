const router = require('express').Router();
const BlogPost = require('../controllers/BlogPost');
const { validateJWT } = require('../middlewares/validateJWT');
const { validatePostEntries } = require('../middlewares/validations');

router.post('/', validateJWT, validatePostEntries, BlogPost.create);

router.get('/', validateJWT, BlogPost.getAll);

module.exports = router;