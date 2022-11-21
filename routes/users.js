const router = require('express').Router();
const { getUserById, createUser, login } = require('../controllers/users');

router.get('/:userId', getUserById);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
