const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { handleAuthError } = require('../utils/errors');

function auth(req, res, next) {
  const { authorization } = req.header;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
}

module.exports = { auth };
