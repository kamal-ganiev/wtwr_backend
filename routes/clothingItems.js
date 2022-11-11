const express = require('express');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require('../controllers/clothingItems');

const router = express.Router();

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:itemId', deleteClothingItem);
router.put('/:itemId/likes', addLike);
router.delete('/:itemId/likes', removeLike);

module.exports = router;
