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

const InsertUser = async (email, password, displayName, image) => {
  const t = await sequelize.transaction();

  try {
    // Depois executamos as operações
    const employee = await User.create(
      { displayName, email, password, image },
      { transaction: t },
    );

    await t.commit();

    return employee;
  } catch (e) {
    await t.rollback();
    console.log(e);
    throw e; // Jogamos o erro para a controller tratar
  }
};

module.exports = {
  getByEmail,
  InsertUser,
};