const { BadRequestError } = require('./errors/BadRequestError');
const { NotFoundError } = require('./errors/NotFoundError');
const { RequestConflictError } = require('./errors/RequestConflictError');
const { ServerError } = require('./errors/ServerError');

const errorHandler = (err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return new BadRequestError('Wrong data sent, check data and try again');
  } if (err.code === 11000) {
    return new RequestConflictError(
      'Entered user is already exists, try again',
    );
  } if (err.statusCode === 404) {
    return new NotFoundError('Looking item does not exist');
  }
  return new ServerError('Something is went wrong, we are working on it');
};

module.exports = { errorHandler };
