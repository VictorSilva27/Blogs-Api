const UserService = require('../services/user.service');
const jwtUtils = require('../utils/createToken');

const postUserController = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  await UserService.InsertUser(email, password, displayName, image);
  const user = await UserService.getByEmail(email, password);
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = jwtUtils.createToken(userWithoutPassword);
  return res.status(201).json({ token });
};

const getAllUsersController = async (_req, res) => {
  const users = await UserService.getAllUsers();
  const result = users.map(({ dataValues }) => dataValues);
  return res.status(200).json(result);
};

const getUserByIdController = async (req, res) => {
  const userId = req.params.id;
  const { dataValues } = await UserService.getByUserId(userId);
  return res.status(200).json(dataValues);
};
  
module.exports = {
  postUserController,
  getAllUsersController,
  getUserByIdController,
};