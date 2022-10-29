const jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = (token) => {
    const decoded = jwt.verify(token, secret);
    return decoded.data.id;
};