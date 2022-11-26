const router = require('express').Router();
const {
  getUserById,
  createUser,
  login,
  getCurrentUser,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');

router.get('/me', auth, getCurrentUser);
router.get('/:userId', auth, getUserById);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
