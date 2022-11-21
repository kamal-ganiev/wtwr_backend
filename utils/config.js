const mongoose = require('mongoose');

module.exports.runServer = (serverAddress) => {
  mongoose.connect(serverAddress);
};
