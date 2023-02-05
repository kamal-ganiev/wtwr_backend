const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  completedRequest,
  completedCreateRequst,
  opts,
} = require('../utils/constants');
const { checkError } = require('../utils/error-handler');
const { NotFoundError, NotAuthError } = require('../utils/errors');

const { JWT_SECRET = 'dev_key' } = process.env;

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      next(new NotFoundError('Wrong id, user does not exist'));
    })
    .then((user) => {
      completedRequest(user, res);
    })
    .catch((err) => {
      checkError(err);
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((updatedUser) => {
      const updatedDataToSend = updatedUser;
      updatedDataToSend.password = undefined;
      completedCreateRequst(updatedDataToSend, res);
    })
    .catch((err) => {
      checkError(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch((err) => {
      next(new NotAuthError('Wrong email or password'));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError('Wrong id, user does not exist'));
    })
    .then((user) => {
      completedRequest(user, res);
    })
    .catch((err) => {
      checkError(err);
    });
};

/// Functions for User Update \\\

const updateUserData = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, avatar }, opts)
    .orFail(() => {
      next(NotFoundError('Wrong id, user does not exist'));
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      checkError(err);
    });
};

module.exports = {
  getUserById,
  createUser,
  login,
  getCurrentUser,
  updateUserData,
};
