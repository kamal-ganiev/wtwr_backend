const clothingItem = require('../models/clothingItem');
const {
  completedRequest,
  completedCreateRequst,
} = require('../utils/constants');
const { checkError } = require('../utils/error-handler');
const { NotFoundError } = require('../utils/errors');

/// Handling Cards Calls \\\

const getClothingItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((item) => {
      if (!item) {
        throw new NotFoundError('Items are not found');
      }

      completedRequest(item, res);
    })
    .catch(next);
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  clothingItem
    .create({
      name,
      weather,
      imageUrl,
      owner,
    })
    .then((item) => {
      completedCreateRequst(item, res);
    })
    .catch((e) => {
      checkError(e);
    });
};

const deleteClothingItem = (req, res, next) => {
  clothingItem
    .findByIdAndRemove(req.params.itemId)
    .orFail(() => {
      next(new NotFoundError('Looking item is not found'));
    })
    .then((itemList) => {
      completedRequest(itemList, res);
    })
    .catch((err) => checkError(err));
};

/// Handling Likes \\\

const addLike = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      next(new NotFoundError('Looking item is not found'));
    })
    .then((item) => {
      completedRequest(item, res);
    })
    .catch((err) => {
      checkError(err);
    });
};

const removeLike = (req, res, next) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      next(new NotFoundError('Looking item is not found'));
    })
    .then((item) => {
      completedRequest(item, res);
    })
    .catch((err) => {
      checkError(err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
};
