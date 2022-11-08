const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
