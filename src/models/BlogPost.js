module.exports = (sequelize, DataTypes) => {
    const PostTable = sequelize.define('BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: { type: DataTypes.INTEGER, foreignKey: true },
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: true,
    });
  
    PostTable.associate = (models) => {
      PostTable.belongsTo(models.User,
        { foreignKey: 'userId', as: 'User' });
    };
  
    return PostTable;
  };