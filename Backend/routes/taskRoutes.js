const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create-task', taskController.createTask);
router.get('/get-task/:userId', taskController.getTasks);
router.put('/update-task', taskController.updateTask);
router.delete('/delete-task', taskController.deleteTask);

module.exports = router;
