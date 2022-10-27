const UserService = require('../services/user.service');

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400)
        .json({ message: 'Some required fields are missing' });
    }
    const result = await UserService.getByEmail(email, password);
    if (!result) return res.status(400).json({ message: 'Invalid fields' });
    return next();
};

module.exports = {
    validateLogin,
};