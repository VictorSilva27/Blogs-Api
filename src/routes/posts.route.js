const express = require('express');
const {
    getAllPostsController,
    getOnePostController,
    getSearchPostController,
    putPostController,
    deletePostController,
    postPostController,
} = require('../controllers/posts.controller');
const validateJWT = require('../middlewares/validateJWT');
const { validateUserFromPost,
    validateCampus, validatePostId,
    validateCampusCategoryIds } = require('../middlewares/validatePost');

const router = express.Router();

router.get('/', validateJWT, getAllPostsController);
router.post('/', validateJWT, validateCampus, validateCampusCategoryIds, postPostController);
router.get('/search', validateJWT, getSearchPostController);
router.get('/:id', validateJWT, getOnePostController);
router.put('/:id', validateJWT, validateUserFromPost, validateCampus, putPostController);
router.delete('/:id', validateJWT, validatePostId, validateUserFromPost, deletePostController);

module.exports = router;