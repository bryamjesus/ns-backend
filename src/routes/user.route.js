const express = require("express");
const controller = require("../controllers/user.controller");
const router = express.Router();

router.get("/", (req, res) => {
  controller.getAllUser(res);
});

router.get("/:id", (req, res) => {
  controller.getOneUser(req, res);
});

router.post("/", (req, res) => {
  controller.createUser(req, res);
});

router.put("/:id", (req, res) => {
  controller.updateUser(req, res);
});

router.delete('/:id', (req,res) => {
  controller.deleteUser(req,res)
})

module.exports = router;
