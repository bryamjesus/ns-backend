const categoryModel = require("../models/category.model");

const controller = {
  async getAllCategory(res) {
    try {
      const result = await categoryModel.find();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
