const express = require("express");
const controller = require("../controllers/user.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/login", (req, res) => {
  controller.loginUser(req, res);
});

router.get("/", auth, (req, res) => {
  controller.getAllUsers(res);
});

router.get("/:id", auth, (req, res) => {
  controller.getOneUser(req, res);
});

router.post("/", auth, (req, res) => {
  controller.createUser(req, res);
});

router.put("/:id", auth, (req, res) => {
  controller.updateUser(req, res);
});

router.delete("/:id", auth, (req, res) => {
  controller.deleteUser(req, res);
});

module.exports = router;
