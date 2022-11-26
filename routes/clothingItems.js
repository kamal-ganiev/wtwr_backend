const express = require('express');
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  addLike,
  removeLike,
} = require('../controllers/clothingItems');
const { auth } = require('../middlewares/auth');
const { checkOwner } = require('../middlewares/checkOwner');

const router = express.Router();

router.get('/', getClothingItems);
router.post('/', auth, createClothingItem);
router.delete('/:itemId', auth, checkOwner, deleteClothingItem);
router.put('/:itemId/likes', auth, addLike);
router.delete('/:itemId/likes', auth, removeLike);

module.exports = router;
