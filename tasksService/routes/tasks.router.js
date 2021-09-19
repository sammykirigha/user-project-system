const express = require('express');
const tasksControllers = require('../conrollers/task.controller');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory');
const router = express.Router();



router.get('/', awaitHandlerFactory(tasksControllers.getAllTasks));
router.get('/id/:id', awaitHandlerFactory(tasksControllers.getTaskById));
router.delete('/id/:id', awaitHandlerFactory(tasksControllers.deleteTask));
router.patch('/id/:id', awaitHandlerFactory(tasksControllers.updateTask));
router.post('/create', awaitHandlerFactory(tasksControllers.createTask));

module.exports = router;