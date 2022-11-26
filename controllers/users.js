const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  completedRequest,
  completedCreateRequst,
  opts,
} = require('../utils/constants');
const { orFailFunction, handleError } = require('../utils/errors');

const { JWT_SECRET } = process.env;

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
    password
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      avatar,
      email,
      password: hash
    }))
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

const updateName = (req, res) => {
  const { name } = req.body;

  User.findByIdAndUpdate(req.user._id, { name }, opts)
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

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
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

const updateEmail = (req, res) => {
  const { email } = req.body;

  User.findByIdAndUpdate(req.user._id, { email }, opts)
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

const updatePassword = (req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.findByIdAndUpdate(req.user._id, { password: hash }, opts)
      .orFail(() => {
        orFailFunction();
      })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        handleError(res, err);
      });
  });
};

/// Callback for User Updating route \\\

const updateUserData = (req, res) => {
  if (req.body.name) {
    updateName(req, res);
  } else if (req.body.avatar) {
    updateAvatar(req, res);
  } else if (req.body.email) {
    updateEmail(req, res);
  } else if (req.body.password) {
    updatePassword(req, res);
  }
};

module.exports = {
  getUserById,
  createUser,
  login,
  getCurrentUser,
  updateUserData,
};
