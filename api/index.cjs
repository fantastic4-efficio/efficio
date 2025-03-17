const express = require('express');
const router = express.Router();

// teams routers
router.use('/users', require('./usersAPI.cjs'));
// projects routers
router.use('/projects', require('./projectsAPI.cjs'));
// tasks routers
router.use('/tasks', require('./tasksAPI.cjs'));
// teams routers
router.use('/teams', require('./teamsAPI.cjs'));


module.exports = router;