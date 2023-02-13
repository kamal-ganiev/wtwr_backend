const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { runServer } = require('./utils/config');
const { PORT } = require('./utils/constants');
const { errors } = require('celebrate');
const {
  userSignUpValidation,
  userLogInValidation,
} = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
runServer('mongodb://localhost:27017/wtwr_db');

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/signup', userSignUpValidation, createUser);
app.use('/signin', userLogInValidation, login);
app.use('/items', require('./routes/clothingItems'));
app.use('/users', require('./routes/users'));
app.use('*', require('./routes/errorHandler'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({
      message: 'There is an error occured on server, we are working on it',
    });
  }
});

app.listen(PORT);

