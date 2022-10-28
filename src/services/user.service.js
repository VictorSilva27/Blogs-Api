const Sequelize = require('sequelize');
const config = require('../config/config');
const { User } = require('../models/index');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const getByEmail = async (email, password) => {
  const user = await User.findOne({
      where: { email, password },
    });
  return user;
};

const getByUserId = async (id) => {
  const user = await User.findOne({
      where: { id },
      attributes: { exclude: 'password' },
    });
  return user;
};

const InsertUser = async (email, password, displayName, image) => {
  const t = await sequelize.transaction();

  try {
    const users = await User.create(
      { displayName, email, password, image },
      { transaction: t },
    );

    await t.commit();

    return users;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e;
  }
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: 'password' },
  });
  return users;
};

module.exports = {
  getByEmail,
  InsertUser,
  getByUserId,
  getAllUsers,
};