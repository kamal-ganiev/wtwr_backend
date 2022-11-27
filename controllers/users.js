const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  completedRequest,
  completedCreateRequst,
  opts,
} = require('../utils/constants');
const { orFailFunction, handleError } = require('../utils/errors');

const { JWT_SECRET = 'dev_key' } = process.env;

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
  const {
    name,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash,
    }))
    .then((updatedUser) => {
      const updatedDataToSend = updatedUser;
      updatedDataToSend.password = undefined;
      completedCreateRequst(updatedDataToSend, res);
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

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
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

/// Functions for User Update \\\

const updateUserData = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, avatar }, opts)
    .orFail(() => {
      orFailFunction();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  getUserById,
  createUser,
  login,
  getCurrentUser,
  updateUserData,
};
