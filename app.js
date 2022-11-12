const express = require('express');
const helmet = require('helmet');
const { runServer } = require('./utils/config');
const { PORT } = require('./utils/constants');

const app = express();
runServer('mongodb://localhost:27017/wtwr_db');

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '636fe3aca99c6f50a259b8ef',
  };

  next();
});

app.use('/items', require('./routes/clothingItems'));
app.use('/users', require('./routes/users'));
app.use('*', require('./routes/errorHandler'));

app.listen(PORT);
