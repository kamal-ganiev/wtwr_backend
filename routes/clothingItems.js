const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} = require("../controllers/clothingItems");
const router = require("express").Router();

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);

module.exports = router;
