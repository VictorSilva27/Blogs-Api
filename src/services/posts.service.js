const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, User, Category, PostCategory } = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const insertPost = async (title, content, userId, arrayIdsCate) => {
  const t = await sequelize.transaction();
  try {
    const posts = await BlogPost.create(
      { title, content, userId, published: today.toISOString(), updated: today.toISOString() },
      { transaction: t },
    );

    Promise.all(
      arrayIdsCate.map((categoryId) => PostCategory.create({
        postId: Number(posts.id), categoryId: Number(categoryId),
      })),
    );
    await t.commit();

    return { status: 201, response: posts };
  } catch (e) {
    await t.rollback();
    throw e;
  }
};

const getAllBlogPost = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return { status: 200, response: posts };
};

const getOneBlogPost = async (id) => {
  const [posts] = await BlogPost.findAll({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: 'password' },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  if (!posts) {
    return { status: 404, response: { message: 'Post does not exist' } };
  }
  return { status: 200, response: posts };
};

const objFilter = (name) => ({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${name}%` } },
      { content: { [Op.like]: `%${name}%` } },
    ], 
  },
  include: [{
    model: User,
    as: 'user',
    attributes: { exclude: 'password' },
  }, {
    model: Category,
    as: 'categories',
    through: { attributes: [] },
  }],
});

const getPostByTitleOrContent = async (name) => {
  const obj = objFilter(name);
  const posts = await BlogPost.findAll(obj);
  return { status: 200, response: posts };
};

const updatePost = async (title, content, id) => {
  await BlogPost.update({
      title,
      content },
    { where: { id } });
  const { response } = await getOneBlogPost(id);
  return { status: 200, response };
};

const deletePost = async (id) => {
  await BlogPost.destroy({
    where: { id },
  });
  return { status: 204 };
};

module.exports = {
  getAllBlogPost,
  getOneBlogPost,
  getPostByTitleOrContent,
  updatePost,
  deletePost,
  insertPost,
};