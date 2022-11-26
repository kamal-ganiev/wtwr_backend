const router = require('express').Router();
const {
  getUserById,
  createUser,
  login,
  getCurrentUser,
  updateUserData,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUserData);

module.exports = router;
