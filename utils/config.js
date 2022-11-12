const mongoose = require('mongoose');

module.exports.runServer = () => {
  mongoose.connect('mongodb://localhost:27017/wtwr_db');
};
