const express = require('express');
const usersController = require('../controllers/users.controller');
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory');
const router = express.Router();

const { createUserSchema, updateUserSchema, validateLogin } = require('../middlewares/validators/userValidations');

router.get('/', awaitHandlerFactory(usersController.getAllUsers));
router.get('/id/:id', awaitHandlerFactory(usersController.getUserById));
router.delete('/id/:id', awaitHandlerFactory(usersController.deleteUser));
router.patch('/id/:id', awaitHandlerFactory(usersController.updateUser));
router.post('/signup', awaitHandlerFactory(usersController.createUser));

router.post('/login', awaitHandlerFactory(usersController.userLogin))

module.exports = router;