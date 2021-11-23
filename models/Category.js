module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.BlogPost, {
      as: 'categories',
      through: models.PostsCategory,
      foreignKey: 'categoryId',
    });
  };

  return Category;
};