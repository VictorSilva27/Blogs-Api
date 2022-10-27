const express = require('express');
const {
    postLoginController,
} = require('../controllers/login.controller');
const { validateLogin } = require('../middlewares/validateLogin');

const router = express.Router();

router.post('/', validateLogin, postLoginController);

module.exports = router;