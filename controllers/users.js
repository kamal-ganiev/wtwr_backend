const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      if (data.length === 0) {
        res.status(200).send({ message: "There is no any users yet" });

        return;
      }

      res.send({ data: data });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(404).send({ message: "There is no user with requested ID" });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((updatedUser) => res.send({ data: updatedUser }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: `Bad request: ${err.message}` });

        return;
      }

      res.status(500).send({ message: err.message });
    });
};

module.exports = { getUserById, getUsers, createUser };
