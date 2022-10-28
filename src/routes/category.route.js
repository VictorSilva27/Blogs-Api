const express = require('express');
const {
    postCategoryController,
    getCategoryController,
} = require('../controllers/category.controller');
const validateJWT = require('../middlewares/validateJWT');
const { validateName } = require('../middlewares/validateCategory');

const router = express.Router();

router.post('/', validateJWT, validateName, postCategoryController);
router.get('/', validateJWT, getCategoryController);

module.exports = router;