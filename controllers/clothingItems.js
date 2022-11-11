const clothingItem = require('../models/clothingItem');
const { orFailFunction, handleError } = require('../utils/errors');

/// Handling Cards Calls \\\

const getClothingItems = (req, res) => {
  clothingItem
    .find({})
    .then((itemList) => {
      if (itemList.length === 0) {
        res.status(200).send({ message: 'There is no any items yet' });

        return;
      }

      res.send(itemList);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .then((item) => res.status(201).send(item))
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
    .then((itemList) => res.send(itemList))
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
      { new: true }
    )
    .orFail(() => {
      orFailFunction();
    })
    .then((item) => res.send(item))
    .catch((err) => {
      handleError(res, err);
    });
};

const removeLike = (req, res) => {
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      orFailFunction();
    })
    .then((item) => res.send(item))
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
