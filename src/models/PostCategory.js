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
      PostCategory.belongsTo(models.UserTable,
        { foreignKey: 'postId', as: 'blog_posts' },
        { foreignKey: 'categoryId', as: 'categories' },
        );
    };
  
    return PostCategory;
  };