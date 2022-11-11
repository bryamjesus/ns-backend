const fs = require("fs");
const productModel = require("../models/product.model");

const controller = {
  async getAllProducts(res) {
    try {
      const result = await productModel.find();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async createProduct(req, res) {
    const { category, name, description, stock, price, image, image64 } =
      req.body;
    const product = new productModel();
    product.category = category;
    product.name = name;
    product.description = description;
    product.stock = stock;
    product.price = price;
    if (image) {
      const buffer = Buffer.from(image64, "base64");
      fs.writeFileSync(`./public/products/${image}`, buffer);
      product.image = image;
    }

    try {
      const result = await product.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
