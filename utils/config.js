const mongoose = require('mongoose');

module.exports.runServer = (serverAddress) => {
  mongoose.connect(serverAddress);
};

module.exports.JWT_SECRET = 'TOP_SECRET';
