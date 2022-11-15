const fs = require("fs");
const productModel = require("../models/product.model");
const { PATH_IMG_PRODUCT } = require("../shared/utils/const.utils");

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
  async getOneProduct(req, res) {
    try {
      const { id } = req.params;
      const result = await productModel.findById(id);
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
      fs.writeFileSync(`${PATH_IMG_PRODUCT}${image}`, buffer);
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
  async updateProduct({ params, body }, res) {
    const { id } = params;
    const { category, name, description, stock, price, state } = body;
    const update = {
      category,
      name,
      description,
      stock,
      price,
      state,
    };

    try {
      const result = await productModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async updateAllProduct({ params, body }, res) {
    const { id } = params;
    const {
      category,
      name,
      description,
      stock,
      price,
      image,
      image_actual,
      image64,
      state,
    } = body;
    const update = {
      category,
      name,
      description,
      stock,
      price,
      state,
    };

    if (image) {
      if (image_actual != "default.png") {
        fs.unlinkSync(PATH_IMG_PRODUCT + image_actual);
      }
      const buffer = Buffer.from(image64, "base64");
      fs.writeFileSync(PATH_IMG_PRODUCT + image, buffer);
      update["image"] = image;
    }
    try {
      const result = await productModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
