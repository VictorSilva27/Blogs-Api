const express = require('express');
const {
    postUserController,
    getAllUsersController,
    getUserByIdController,
    deleteUserByIdController,
} = require('../controllers/user.controller');
const {
    validateEmail,
    validateName,
    validatePassword,
    validateUserId,
} = require('../middlewares/validateUser');

const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get('/', validateJWT, getAllUsersController);
router.get('/:id', validateJWT, validateUserId, getUserByIdController);
router.delete('/me', validateJWT, deleteUserByIdController);

router.post('/', validateEmail,
validateName,
validatePassword, postUserController);

module.exports = router;