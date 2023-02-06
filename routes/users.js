const router = require('express').Router();
const {
  getUserById,
  getCurrentUser,
  updateUserData,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const {
  idValidation,
  userUpdateValidation,
} = require('../middlewares/validation');

router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, idValidation, getUserById);
router.patch('/me', auth, userUpdateValidation, updateUserData);

module.exports = router;
