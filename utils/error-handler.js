const {
  BadRequestError,
  RequestConflictError,
  NotFoundError,
  ServerError,
} = require('./errors');

const errorHandler = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new BadRequestError('Wrong data sent, check data and try again');
  } else if (err.code === 11000) {
    return new RequestConflictError(
      'Entered user is already exists, try again'
    );
  } else if (err.statusCode === 404) {
    return new NotFoundError('Looking item does not exist');
  } else {
    return new ServerError('Something is went wrong, we are working on it');
  }
};

module.exports = { errorHandler };
