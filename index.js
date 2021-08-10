const express = require("express");
const app = express();

const customersRouter = require("./routes/r_customers");
const transactions = require("./routes/r_transactions");
const goodsRouter = require("./routes/r_goods");
const supplierRouter = require("./routes/r_suppliers");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/customers", customersRouter);
app.use("/transactions", transactions);
app.use("/goods", goodsRouter);
app.use("/supplier", supplierRouter);

//runiing servee
app.listen(3000, () => console.log("I LOVE YOU 3000"));
