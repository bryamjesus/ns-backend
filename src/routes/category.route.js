const express = require("express");
const controller = require("../controllers/category.controller");
const router = express.Router()

router.get("/", (req, res) => {
  controller.getAllCategory(res);
});

module.exports = router;
