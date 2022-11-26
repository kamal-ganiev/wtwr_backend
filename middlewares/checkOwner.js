const {
  handleDenyUpdate,
  orFailFunction,
  handleError,
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
        handleDenyUpdate(res);

        return;
      }

      next();
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = { checkOwner };
