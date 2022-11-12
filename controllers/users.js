const User = require('../models/user');
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
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((updatedUser) => {
      completedCreateRequst(updatedUser, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = { getUserById, getUsers, createUser };
