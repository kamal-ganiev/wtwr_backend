const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../utils/errors');

const { JWT_SECRET = 'dev_key' } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthError('You are not authorised'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new NotAuthError('You are not authorised'));
  }

  req.user = payload;

  return next();
}

module.exports = { auth };
