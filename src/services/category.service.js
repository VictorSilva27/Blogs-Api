const Sequelize = require('sequelize');
const config = require('../config/config');
const { Category } = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const InsertCategory = async (name) => {
  const t = await sequelize.transaction();

  try {
    const category = await Category.create(
      { name },
      { transaction: t },
    );

    await t.commit();

    return category;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e;
  }
};

const getAllCategory = async () => {
  const category = await Category.findAll();
  return category;
};

const getCategoryById = async (arrayId) => {
  const promisse = arrayId.map((idCate) => Category.findOne({
    where: idCate,
  }));
  const result = Promise.all(promisse);
  return result;
};

module.exports = {
  InsertCategory,
  getAllCategory,
  getCategoryById,
};