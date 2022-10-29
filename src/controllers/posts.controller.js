const PostsService = require('../services/posts.service');

const getAllPostsController = async (_req, res) => {
    const { status, response } = await PostsService.getAllBlogPost();
    res.status(status).json(response);
};

const getOnePostController = async (req, res) => {
    const postId = req.params.id;
    const { status, response } = await PostsService.getOneBlogPost(postId);
    res.status(status).json(response);
};

const getSearchPostController = async (req, res) => {
    const { q } = req.query;
    if (q.length === 0) {
        const { status, response } = await PostsService.getAllBlogPost();
        return res.status(status).json(response);
      }
    const { status, response } = await PostsService.getPostByTitleOrContent(q);
    res.status(status).json(response);
};

module.exports = {
getAllPostsController,
getOnePostController,
getSearchPostController,
};