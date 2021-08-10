const express = require("express");
const router = express.Router();

const Suppliers = require("../controllers/c_suppliers");

router.get("/", Suppliers.getAllSuppliers);
router.get("/:id", Suppliers.getOneSupplier);
router.post("/", Suppliers.createSupplier);
router.put("/:id", Suppliers.updateSupplier);
router.delete("/:id", Suppliers.deleteSupplier);

module.exports = router;
