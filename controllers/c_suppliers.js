const { query } = require("../models/connection");

class Suppliers {
  async getAllSuppliers(req, res) {
    try {
      const data = await query(`SELECT * FROM suppliers`);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getOneSupplier(req, res) {
    try {
      const data = await query(
        `SELECT * FROM suppliers WHERE id=${req.params.id}`
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async createSupplier(req, res) {
    try {
      const data = await query(
        `INSERT INTO suppliers(name) VALUES('${req.body.name}')`
      );

      const newSupplier = await query(
        `SELECT * FROM suppliers WHERE id=${data.insertId}`
      );

      res.status(201).json({
        data,
        newSupplier,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateSupplier(req, res) {
    try {
      const transaction = await query(
        `SELECT * FROM suppliers WHERE id=${req.params.id}`
      );
      if (transaction.length === 0) {
        return res.status(404).json({
          message: "Supplier is not found!",
        });
      }

      await query(
        `UPDATE suppliers SET name='${req.body.name}' WHERE id=${req.params.id}`
      );

      const data = await query(
        `SELECT * FROM suppliers WHERE id=${req.params.id}`
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

  async deleteSupplier(req, res) {
    try {
      const deletedData = await query(
        `DELETE FROM suppliers WHERE id=${req.params.id}`
      );

      if (deletedData.affectedRows === 0) {
        return res.status(404).json({
          message: "supplier is not found",
        });
      }

      res.status(200).json({
        message: `Deleted supplier with id ${req.params.id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Suppliers();
