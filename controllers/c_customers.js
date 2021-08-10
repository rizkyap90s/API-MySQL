const { query } = require("../models/connection");

class Customers {
  async getCustomers(req, res) {
    try {
      const data = await query(`SELECT * FROM customers`);
      res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getOneCustomer(req, res) {
    try {
      const data = await query(
        `SELECT * FROM customers WHERE id=${req.params.id}`
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

  async createCustomer(req, res) {
    try {
      // ? create a new customer
      // ? and store the response to data
      const data = await query(
        `INSERT INTO customers(name) VALUES('${req.body.name}')`
      );

      const newCustomer = await query(
        `SELECT * FROM customers WHERE id=${data.insertId}`
      );

      res.status(201).json({
        data,
        newCustomer,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateCustomer(req, res) {
    try {
      // ? check if customer exist
      const customer = await query(
        `SELECT * FROM customers WHERE id=${req.params.id}`
      );
      if (customer.length === 0) {
        return res.status(404).json({
          message: "Customer not found!",
        });
      }
      //   ? update the customer
      await query(
        `UPDATE customers SET name='${req.body.name}' WHERE id=${req.params.id}`
      );

      //   ? get updated data
      const data = await query(
        `SELECT * FROM customers WHERE id=${req.params.id}`
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

  async deleteCustomer(req, res) {
    try {
      const deletedData = await query(
        `DELETE FROM customers WHERE id=${req.params.id}`
      );

      if (deletedData.affectedRows === 0) {
        return res.status(404).json({
          message: "Customer not found",
        });
      }

      res.status(200).json({
        message: `Deleted Customer with id ${req.params.id}`,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new Customers();
