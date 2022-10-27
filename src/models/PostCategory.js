module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
      postId: { type: DataTypes.INTEGER, foreignKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });
    
    PostCategory.associate = (models) => {
      models.Category.belongsToMany(models.BlogPost, {
        through: PostCategory,
        as: "posts",
        foreignKey: "categoryId",
        otherKey: "postId",
      });
  
      models.BlogPost.belongsToMany(models.Category, {
        through: PostCategory,
        as: "categories",
        foreignKey: "postId",
        otherKey: "categoryId",
      });
    };

    return PostCategory;
  };