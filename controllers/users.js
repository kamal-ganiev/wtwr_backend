const User = require('../models/user');
const { orFailFunction, handleError } = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length === 0) {
        res.status(200).send({ message: 'There is no any users yet' });

        return;
      }

      res.send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      orFailFunction();
    })
    .then((user) => res.send(user))
    .catch((err) => {
      handleError(res, err);
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((updatedUser) => res.status(201).send(updatedUser))
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = { getUserById, getUsers, createUser };
