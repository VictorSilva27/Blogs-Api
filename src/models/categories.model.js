module.exports = (sequelize, DataTypes) => {
    const CategoriesTable = sequelize.define('Categories', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'categories',
        underscored: true,
    });

    CategoriesTable.associate = (models) => {
        CategoriesTable.hasOne(models.BlogTable,
          { foreignKey: 'categoryId', as: 'posts_categories' });
    };
    return CategoriesTable;
}