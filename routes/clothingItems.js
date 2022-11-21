const express = require('express');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require('../controllers/clothingItems');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth, getClothingItems);
router.post('/', auth, createClothingItem);
router.delete('/:itemId', auth, deleteClothingItem);
router.put('/:itemId/likes', auth, addLike);
router.delete('/:itemId/likes', auth, removeLike);

module.exports = router;
