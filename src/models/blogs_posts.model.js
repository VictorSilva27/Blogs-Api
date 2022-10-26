module.exports = (sequelize, DataTypes) => {
    const BlogTable = sequelize.define('Blog_posts', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.DATE,
      uptaded: DataTypes.DATE,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: true,
    });
  
    BlogTable.associate = (models) => {
      BlogTable.belongsTo(models.UserTable,
        { foreignKey: 'userId', as: 'users' });
    };
  
    return BlogTable;
  };