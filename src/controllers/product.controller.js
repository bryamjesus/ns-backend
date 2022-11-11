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
    const { categoryId, name, price, image, image64 } = req.body;
    const product = new productModel();
    product.categoryId = categoryId;
    product.name = name;
    product.price = price;
    if (image) {
      const buffer = Buffer.from(image64, "base64");
      fs.writeFileSync(`./public/${image}`, buffer);
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
