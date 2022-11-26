const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { runServer } = require('./utils/config');
const { PORT } = require('./utils/constants');

const app = express();
runServer('mongodb://localhost:27017/wtwr_db');

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/signup', createUser);
app.use('/signin', login);
app.use('/items', require('./routes/clothingItems'));
app.use('/users', require('./routes/users'));
app.use('*', require('./routes/errorHandler'));

app.listen(PORT);
