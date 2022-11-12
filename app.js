const express = require('express');
const helmet = require('helmet');
const { runServer } = require('./utils/config');
const { PORT } = require('./utils/constants');

const app = express();
runServer();

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '636dc2bca52f4cab8c84e179',
  };

  next();
});

app.use('/items', require('./routes/clothingItems'));
app.use('/users', require('./routes/users'));
app.use('*', require('./routes/errorHandler'));

app.listen(PORT);
