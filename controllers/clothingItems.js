const clothingItem = require('../models/clothingItem');
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

/// Handling Cards Calls \\\

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((item) => {
      if (item.length === 0) {
        completedRequestWithEmptyRespond(item, res);
      }
      completedRequest(item, res);
    })
    .catch((err) => {
      handleServerError(res, err);
    });
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
    .catch((err) => {
      handleError(res, err);
    });
};

const deleteClothingItem = (req, res) => {
  clothingItem
    .findByIdAndRemove(req.params.itemId)
    .orFail(() => {
      orFailFunction();
    })
    .then((itemList) => {
      completedRequest(itemList, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

/// Handling Likes \\\

const addLike = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      orFailFunction();
    })
    .then((item) => {
      completedRequest(item, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

const removeLike = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      orFailFunction();
    })
    .then((item) => {
      completedRequest(item, res);
    })
    .catch((err) => {
      handleError(res, err);
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
};
