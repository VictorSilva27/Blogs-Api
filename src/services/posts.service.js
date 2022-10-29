// const Sequelize = require('sequelize');
// const config = require('../config/config');
const { BlogPost, User, Category } = require('../models/index');

// const env = process.env.NODE_ENV || 'development';
// const sequelize = new Sequelize(config[env]);

// const InsertCategory = async (name) => {
//   const t = await sequelize.transaction();

//   try {
//     const category = await Category.create(
//       { name },
//       { transaction: t },
//     );

//     await t.commit();

//     return category;
//   } catch (e) {
//     await t.rollback();
//     console.log(e);
//     throw e;
//   }
// };

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
  return posts;
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

module.exports = {
  getAllBlogPost,
  getOneBlogPost,
};