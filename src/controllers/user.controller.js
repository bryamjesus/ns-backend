const userModel = require("../models/user.model");

const controller = {
  async getAllUser(res) {
    try {
      const result = await userModel.find();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const result = await userModel.findById(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async createUser(req, res) {
    const { typeUser, allName, email, password } = req.body;
    const user = new userModel();
    user.typeUser = typeUser;
    user.allName = allName;
    user.email = email;
    user.password = password;
    try {
      const result = await user.save();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { typeUser, allName, email, password, state } = req.body;
    const newUser = {
      typeUser,
      allName,
      email,
      password,
      state,
    };
    try {
      const result = await userModel.findByIdAndUpdate(id, newUser, {
        new: true,
      });
      res.json(result);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userModel.findByIdAndDelete(id);
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },
};

module.exports = controller;
