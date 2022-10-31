const PostsService = require('../services/posts.service');
const CategoryService = require('../services/category.service');
const getUserToken = require('./getUserByToken');

const validateUserFromPost = async (req, res, next) => {
    const postId = req.params.id;
    const token = req.header('Authorization');
    const userId = getUserToken(token);
    const { response: { dataValues } } = await PostsService.getOneBlogPost(postId);
    const { id } = Object.values(dataValues.user)[0];
    if (id !== userId) return res.status(401).json({ message: 'Unauthorized user' });
    return next();
};

const validateCampus = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Some required fields are missing' }); 
    }
    return next();
};

const validateCampusCategoryIds = async (req, res, next) => {
    const { categoryIds } = req.body;
    if (!categoryIds) {
        return res.status(400).json({ message: 'Some required fields are missing' }); 
    }
    const resultPromisse = await CategoryService.getCategoryById(categoryIds);
    const result = resultPromisse.every((Category) => Category !== null);
    if (!result) return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    return next();
};

const validatePostId = async (req, res, next) => {
    const postId = req.params.id;
    const { status, response } = await PostsService.getOneBlogPost(postId);
    if (status !== 200) return res.status(status).json(response);
    return next();
};

module.exports = {
    validateUserFromPost,
    validateCampus,
    validatePostId,
    validateCampusCategoryIds,
};