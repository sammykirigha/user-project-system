const express = require('express');
const projectsControllers = require('../conrollers/projects.controllers');
const awaitHandlerFactory = require('../middlewares/awaitHandlerFactory');
const router = express.Router();

router.get('/', awaitHandlerFactory(projectsControllers.getAllProjects));
router.get('/id/:id', awaitHandlerFactory(projectsControllers.getProjectById));
router.delete('/id/:id', awaitHandlerFactory(projectsControllers.deleteProject));
router.patch('/id/:id', awaitHandlerFactory(projectsControllers.updateProject));
router.post('/create', awaitHandlerFactory(projectsControllers.createProject));

module.exports = router;