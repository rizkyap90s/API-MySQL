const express = require("express");
const router = express.Router();

const {
  getAllGoods,
  getGoodsById,
  addNewGoods,
  updateGoods,
  deleteGood,
} = require("../controllers/c_goods");

router.get("/", getAllGoods);
router.get("/:id", getGoodsById);
router.post("/", addNewGoods);
router.put("/:id", updateGoods);
router.delete("/:id", deleteGood);

module.exports = router;
