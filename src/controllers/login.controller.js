const UserService = require('../services/user.service');
const jwtUtils = require('../utils/createToken');

const postLoginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserService.getByEmail(email, password);
    const { password: _, ...userWithoutPassword } = user.dataValues;
    const token = jwtUtils.createToken(userWithoutPassword);
    res.status(200).json({ token });
};

module.exports = {
    postLoginController,
};