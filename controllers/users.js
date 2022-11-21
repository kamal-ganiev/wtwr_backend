const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {
  completedRequest,
  completedCreateRequst,
  completedRequestWithEmptyRespond,
} = require('../utils/constants');
const {
  orFailFunction,
  handleError,
  handleServerError,
} = require('../utils/errors');
const { JWT_SECRET } = require('../utils/config');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length === 0) {
        completedRequestWithEmptyRespond(data, res);
      }
      completedRequest(data, res);
    })
    .catch((err) => {
      handleServerError(res, err);
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      orFailFunction();
    })
    .then((user) => {
      completedRequest(user, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((updatedUser) => {
      completedCreateRequst(updatedUser, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = { getUserById, getUsers, createUser, login };
