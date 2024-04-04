const express = require('express');
const router = express.Router();

const { getAllTasks, getTask, createTask, putTask, patchTask, deleteTask} = require('../controllers/tasks');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks/', createTask);
router.put('/tasks/:id', putTask);
router.patch('/tasks/:id', patchTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;