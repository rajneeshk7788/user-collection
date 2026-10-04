const express = require('express');
const {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  validateTaskId,
} = require('../controllers/taskController');

const router = express.Router();

router.route('/').get(listTasks).post(createTask);
router
  .route('/:id')
  .all(validateTaskId)
  .get(getTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;