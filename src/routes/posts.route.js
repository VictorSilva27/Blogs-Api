const express = require('express');
const {
    getAllPostsController,
    getOnePostController,
} = require('../controllers/posts.controller');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, getAllPostsController);
router.get('/:id', validateJWT, getOnePostController);

module.exports = router;