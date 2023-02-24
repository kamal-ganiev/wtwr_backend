const router = require('express').Router();
const { NotFoundError } = require('../utils/errors/NotFoundError');

router.all('*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
