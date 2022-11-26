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
      if (req.user._id.value !== item.owner.value) {
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
