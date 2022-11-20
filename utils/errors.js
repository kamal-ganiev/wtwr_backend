const orFailFunction = () => {
  const error = new Error('Item ID not found');
  error.statusCode = 404;
  throw error;
};

const handleError = (res, err) => {
  if (err.statusCode === 404) {
    res.status(404).send({ message: 'Item ID not found' });

    return;
  }
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(400).send({ message: `Bad request: ${err.message}` });

    return;
  }

  res.status(500).send({ message: err.message });
};

const handleServerError = (res, err) => {
  res.status(500).send({ message: err.message });
};

const handleExistenceError = (res) => {
  res.status(409).send({ message: 'Email you entered already exists' });
};

module.exports = {
  orFailFunction,
  handleError,
  handleServerError,
  handleExistenceError,
};
