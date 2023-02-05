const {
  handleDenyUpdate,
  orFailFunction,
  handleError,
  NotAuthError,
  NotFoundError,
} = require('../utils/errors');
const clothingItem = require('../models/clothingItem');

const checkOwner = (req, res, next) => {
  clothingItem
    .findById(req.params.itemId)
    .orFail(() => {
      orFailFunction();
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        next(new NotAuthError('You are not authorised'));
      }

      next();
    })
    .catch((e) => {
      next(new NotFoundError('Looking user is not found'));
    });
};

module.exports = { checkOwner };
