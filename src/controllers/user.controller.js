const UserService = require('../services/user.service');
const jwtUtils = require('../utils/createToken');

const postUserController = async (req, res) => {
  const { email, password, displayName, image } = req.body;
  await UserService.InsertUser(email, password, displayName, image);
  const user = await UserService.getByEmail(email, password);
  const { password: _, ...userWithoutPassword } = user.dataValues;
  const token = jwtUtils.createToken(userWithoutPassword);
  res.status(201).json({ token });
};
  
  module.exports = {
    postUserController,
    // getById;
  };