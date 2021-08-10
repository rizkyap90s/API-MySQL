const { query } = require("../models/connection");
const { deleteTransaction } = require("./c_transactions");

class Goods {
  async getAllGoods(req, res) {
    try {
      const data = await query(`SELECT * FROM goods`);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getGoodsById(req, res) {
    try {
      const data = await query(`SELECT * FROM goods WHERE id=${req.params.id}`);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async addNewGoods(req, res) {
    try {
      const isSupplierExist = await query(
        `SELECT id FROM suppliers WHERE id=${req.body.id_supplier}`
      );

      if (isSupplierExist.length === 0) {
        return res.status(404).json({
          message: "supplier doesn't exist",
        });
      }

      const newGoods = await query(
        `INSERT INTO goods(name, price, id_supplier) VALUES 
	('${req.body.name}', ${req.body.price}, ${req.body.id_supplier})`
      );

      const data = await query(
        `SELECT * FROM goods WHERE id=${newGoods.insertId}`
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

  async updateGoods(req, res) {
    try {
      const isGoodExist = await query(
        `SELECT id FROM goods WHERE id=${req.body.id_supplier}`
      );

      if (isGoodExist.length === 0) {
        res.status(404).json({
          message: "goods not found",
        });
      }

      const isSupplierExist = await query(
        `SELECT id FROM suppliers WHERE id=${req.body.id_supplier}`
      );

      if (isSupplierExist.length === 0) {
        return res.status(404).json({
          message: "supplier doesn't exist",
        });
      }

      const updateGoods = await query(
        `UPDATE goods SET name="${req.body.name}", price=${req.body.price}, id_supplier=${req.body.id_supplier} WHERE id=${req.params.id}`
      );

      const data = await query(`SELECT * FROM goods WHERE id=${req.params.id}`);
      res.status(201).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteGood(req, res) {
    try {
      const deleteGood = await query(
        `DELETE FROM goods WHERE id=${req.params.id}`
      );
      if (deleteGood.affectedRows === 0) {
        return res.status(404).json({
          message: "good doesn't exist",
        });
      }

      res.status(200).json({
        message: `good with id ${req.params.id} has been deleted`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Goods();
