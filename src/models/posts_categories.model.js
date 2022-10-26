module.exports = (sequelize, DataTypes) => {
    const BlogTable = sequelize.define('Posts_categories', {
      postId: { type: DataTypes.INTEGER, foreignKey: true },
      categoryId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    });
  
    BlogTable.associate = (models) => {
      BlogTable.belongsTo(models.UserTable,
        { foreignKey: 'postId', as: 'blog_posts' },
        { foreignKey: 'categoryId', as: 'categories' },
        );
    };
  
    return BlogTable;
  };