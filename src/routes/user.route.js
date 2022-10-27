const express = require('express');
const {
    postUserController,
} = require('../controllers/user.controller');
const {
    validateEmail,
    validateName,
    validatePassword,
} = require('../middlewares/validateUser');

const router = express.Router();

router.post('/', validateEmail,
validateName,
validatePassword, postUserController);

module.exports = router;