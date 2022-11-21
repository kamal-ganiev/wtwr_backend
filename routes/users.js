const router = require('express').Router();
const {
  getUserById,
  getUsers,
  createUser,
  login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.lock('/', login);

module.exports = router;
