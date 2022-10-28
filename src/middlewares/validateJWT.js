const jwt = require('jsonwebtoken');

require('dotenv/config');
// const UserService = require('../services/user.service');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
    // const user = await UserService.getByUserId(decoded.data.id);
    // if (!user) {
    // }
    // req.user = user;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
    next();
};