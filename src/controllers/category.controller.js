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
  async getOneCategory(req, res) {
    try {
      const { id } = req.params;
      const result = await categoryModel.findById(id);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async createCategory(req, res) {
    const { name } = req.body;
    const category = new categoryModel();
    category.name = name;
    try {
      const result = await category.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name, status } = req.body;
    const update = {
      name,
      status,
    };
    try {
      const result = await categoryModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
