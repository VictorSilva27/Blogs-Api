const PostsService = require('../services/posts.service');

const getAllPostsController = async (_req, res) => {
    console.log('Entrei');
    const result = await PostsService.getAllBlogPost();
    res.status(200).json(result);
};

const getOnePostController = async (req, res) => {
    const postId = req.params.id;
    const { status, response } = await PostsService.getOneBlogPost(postId);
    res.status(status).json(response);
};

module.exports = {
getAllPostsController,
getOnePostController,
};