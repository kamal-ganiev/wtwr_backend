const {
  notFound,
  badRequest,
  requestConflict,
  serverError,
  unauthorized,
  forbidden,
} = require('./errorCodes');

const orFailFunction = () => {
  const error = new Error('Item ID not found');
  error.statusCode = notFound;
  throw error;
};

const handleError = (res, err) => {
  if (err.statusCode === notFound) {
    res.status(notFound).send({ message: 'Item ID not found' });

    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(badRequest).send({ message: 'Invalid data, check your request and try again' });

    return;
  }
  if (err.code === 11000) {
    res.status(requestConflict).send({ message: 'Email you entered already exists' });

    return;
  }

  res.status(serverError).send({ message: 'Something went wrong, we are working on it' });
};

const handleServerError = (res) => {
  res.status(serverError).send({ message: 'Something went wrong, we are working on it' });
};

const handleAuthError = (res) => {
  res.status(unauthorized).send({ message: 'Authorization Error' });
};

const handleDenyUpdate = (res) => {
  res.status(forbidden).send({ message: 'You have no access to update' });
};

module.exports = {
  orFailFunction,
  handleError,
  handleServerError,
  handleAuthError,
  handleDenyUpdate,
};
