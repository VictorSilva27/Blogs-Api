const express = require('express');
const {
    getAllPostsController,
    getOnePostController,
    getSearchPostController,
    putPostController,
    deletePostController,
} = require('../controllers/posts.controller');
const validateJWT = require('../middlewares/validateJWT');
const { validateUserFromPost,
    validateCampus, validatePostId } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/', validateJWT, getAllPostsController);
router.get('/search', validateJWT, getSearchPostController);
router.get('/:id', validateJWT, getOnePostController);
router.put('/:id', validateJWT, validateUserFromPost, validateCampus, putPostController);
router.delete('/:id', validateJWT, validatePostId, validateUserFromPost, deletePostController);

module.exports = router;