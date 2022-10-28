const { User } = require('../models');
const UserService = require('../services/user.service');

const validateName = (req, res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) {
        return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' });
    }
    return next();
};

const validateUserId = async (req, res, next) => {
    const userId = req.params.id;
    const result = await UserService.getByUserId(userId);
    if (!result) {
        return res.status(404)
        .json({ message: 'User does not exist' });
    }
    return next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    if (password.length < 6) {
        return res.status(400)
        .json({ message: '"password" length must be at least 6 characters long' });
    }
    return next();
};

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({
        where: { email },
      });
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (regex.test(email) === false) {
        return res.status(400)
        .json({ message: '"email" must be a valid email' });
    }
    if (user) {
        return res.status(409).json({ message: 'User already registered' });
    }
    return next();
};

module.exports = { validateEmail, validatePassword, validateName, validateUserId };