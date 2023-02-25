const clothingItem = require('../models/clothingItem');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const checkOwner = (req, res, next) => clothingItem
    .findById(req.params.itemId)
    .orFail(() => {
      next(new NotFoundError('Looking item is not found'));
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        next(new ForbiddenError('You do not have a permission for this'));
      }

      next();
    })

module.exports = { checkOwner };
