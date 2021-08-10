const express = require("express");
const router = express.Router();

const Customers = require("../controllers/c_customers");

router.get("/", Customers.getCustomers);
router.get("/:id", Customers.getOneCustomer);
router.post("/", Customers.createCustomer);
router.put("/:id", Customers.updateCustomer);
router.delete("/:id", Customers.deleteCustomer);

module.exports = router;
