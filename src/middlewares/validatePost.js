const PostsService = require('../services/posts.service');
const getUserToken = require('./getUserByToken');

const validateUserFromPost = async (req, res, next) => {
    console.log('Entrei UserFromPost');
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

const validatePostId = async (req, res, next) => {
    console.log('Entrei postId');
    const postId = req.params.id;
    const { status, response } = await PostsService.getOneBlogPost(postId);
    if (status !== 200) return res.status(status).json(response);
    return next();
};

module.exports = {
    validateUserFromPost,
    validateCampus,
    validatePostId,
};