module.exports = (sequelize, DataTypes) => {
    const UsersTable = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        displayName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'users',
        underscored: true,
    });
    UsersTable.associate = (models) => {
        UsersTable.hasMany(models.BlogPost,
          { foreignKey: 'userId', as: 'BlogPost' });
    };
    return UsersTable;
}