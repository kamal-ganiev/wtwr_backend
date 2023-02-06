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
const {
  clothesValidation,
  idValidation,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', getClothingItems);
router.post('/', auth, clothesValidation, createClothingItem);
router.delete('/:itemId', auth, checkOwner, idValidation, deleteClothingItem);
router.put('/:itemId/likes', auth, idValidation, addLike);
router.delete('/:itemId/likes', auth, idValidation, removeLike);

module.exports = router;
