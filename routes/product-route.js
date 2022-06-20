const express = require("express");
const { Op } = require("sequelize");
const Product = require("../models/Product");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    try {
      const product = await Product.create({
        ...req.body,
      });

      res.status(201).json({
        code: 201,
        message: "Product created successfully",
        product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  })
  .get(async (req, res) => {
    try {
      const { search } = req.query;
      const page = parseInt(req.query.page);
      const perpage = parseInt(req.query.perpage);
      const offset = (page - 1) * perpage;

      const options = {
        limit: perpage,
        offset: offset,
      };

      if (search) {
        options["where"] = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              code: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      }

      const { rows, count } = await Product.findAndCountAll(options);

      res.json({
        code: 200,
        message: "Products retrieved successfully",
        data: rows,
        page,
        perpage,
        total: count,
        pagecount: Math.ceil(count / perpage),
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          code: 404,
          message: "Product not found",
        });
      }

      res.json({
        code: 200,
        message: "Product retrieved successfully",
        data: product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  })
  .put(async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          code: 404,
          message: "Product not found",
        });
      }

      const updatedProduct = await product.update({
        ...req.body,
      });
      res.json({
        code: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  })
  .delete(async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(404).json({
          code: 404,
          message: "Product not found",
        });
      }

      await product.destroy();
      res.json({
        code: 200,
        message: "Product deleted successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        code: 500,
        message: err.message,
      });
    }
  });

module.exports = router;
