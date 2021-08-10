const { query } = require("../models/connection");

class Transactions {
  async getAllTransactions(req, res) {
    try {
      const data = await query(
        "SELECT t.id, g.name as goodName, c.name as customer, s.name as supplier, t.time, t.quantity, t.total FROM transactions t JOIN goods g ON t.id_good = g.id JOIN customers c ON c.id = t.id_customer JOIN suppliers s ON s.id = g.id_supplier"
      );
      res.status(200).json({
        data,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
      });
    }
  }

  getTransactionById(req, res) {
    query(
      `SELECT t.id, g.name as goodName, c.name as customer, s.name as supplier, t.time, t.quantity, t.total FROM transactions t JOIN goods g ON t.id_good = g.id JOIN customers c ON c.id = t.id_customer JOIN suppliers s ON s.id = g.id_supplier WHERE t.id=${req.params.id}`
    )
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({
            message: "Transaction not found",
          });
        }
        res.status(200).json({
          data,
        });
      })
      .catch((e) => {
        res.status(500).json({
          message: e.message,
        });
      });
  }

  // Create data
  async createTransaction(req, res) {
    try {
      const good = await query(
        `SELECT price FROM goods WHERE id=${req.body.id_good}`
      );
      if (good.length === 0) {
        return res.status(404).json({
          message: "good not found",
        });
      }

      const price = good[0].price;
      const total = eval(price * req.body.quantity);

      const newTransaction = await query(
        `INSERT INTO transactions(id_good, id_customer, quantity, total) VALUES (${req.body.id_good}, ${req.body.id_customer}, ${req.body.quantity}, ${total})`
      );

      const data = await query(
        `SELECT t.id, g.name as goodName, c.name as customer, s.name as supplier, t.time, t.quantity, t.total FROM transactions t JOIN goods g ON t.id_good = g.id JOIN customers c ON c.id = t.id_customer JOIN suppliers s ON s.id = g.id_supplier WHERE t.id=${newTransaction.insertId}`
      );
      res.status(201).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: e.message,
      });
    }
  }

  async updateTransaction(req, res) {
    try {
      /* Find the transaction */
      const transaction = await query(
        `SELECT * FROM transactions WHERE id=${req.params.id}`
      );

      if (transaction.length === 0) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      /* Find good price */
      const good = await query(
        `SELECT price FROM goods WHERE id=${req.body.id_good}`
      );

      if (good.length === 0) {
        return res.status(404).json({
          message: "Good not found",
        });
      }

      const price = good[0].price;
      const total = eval(price * req.body.quantity);

      /* Insert transactions */
      await query(
        `UPDATE transactions SET id_good=${req.body.id_good}, id_customer=${req.body.id_customer}, quantity=${req.body.quantity}, total=${total} WHERE id=${req.params.id}`
      );

      /* Get the updated transaction data */
      const data = await query(
        `SELECT t.id, g.name as goodName, c.name as customer, s.name as supplier, t.time, t.quantity, t.total FROM transactions t JOIN goods g ON t.id_good = g.id JOIN customers c ON c.id = t.id_customer JOIN suppliers s ON s.id = g.id_supplier WHERE t.id=${req.params.id}`
      );

      res.status(201).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteTransaction(req, res) {
    try {
      const deletedData = await query(
        `DELETE FROM transactions WHERE id=${req.params.id}`
      );

      if (deletedData.affectedRows === 0) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }

      res.status(200).json({
        message: `Transaction with id ${req.params.id} has been deleted`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Transactions();
