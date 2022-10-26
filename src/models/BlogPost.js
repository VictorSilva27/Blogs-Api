module.exports = (sequelize, DataTypes) => {
    const BlogTable = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      uptaded: DataTypes.DATE,
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