const express = require('express');
const {
    getAllPostsController,
    getOnePostController,
    getSearchPostController,
} = require('../controllers/posts.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, getAllPostsController);
router.get('/search', validateJWT, getSearchPostController);
router.get('/:id', validateJWT, getOnePostController);

module.exports = router;