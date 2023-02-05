const {
  BadRequestError,
  RequestConflictError,
  NotFoundError,
} = require('./errors');

const checkError = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError('Wrong data sent, check data and try again'));
  }

  if (err.code === 11000) {
    next(new RequestConflictError('Entered user is already exists, try again'));
  }

  if (err.statusCode === 404) {
    next(new NotFoundError('Looking item does not exist'));
  }
};

module.exports = { checkError };
