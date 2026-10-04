const express = require('express');
const {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  validateUserId,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(listUsers).post(createUser);
router
  .route('/:id')
  .all(validateUserId)
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;