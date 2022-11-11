const userModel = require("../models/user.model");
const { TOKEN_KEY, TOKEN_EXPIRE } = require("../config");
const { sign } = require("jsonwebtoken");

const controller = {
  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const cliente = {
        email,
        password,
      };
      const result = await userModel.findOne(cliente);
      if (result) {
        const payload = {
          userId: result._id,
          user: result.allName,
          email: result.email,
          role: result.typeUser,
        };
        console.log("payload => ", payload);
        const token = sign(payload, TOKEN_KEY, { expiresIn: TOKEN_EXPIRE });
        res.json({ token });
      } else {
        res.status(401).send("Credenciales incorrectas");
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  async getAllUsers(res) {
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
    const update = {
      typeUser,
      allName,
      email,
      password,
      state,
    };
    try {
      const result = await userModel.findByIdAndUpdate(id, update, {
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
