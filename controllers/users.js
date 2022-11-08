const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.send({ data: data }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getUserById, getUsers, createUser };
