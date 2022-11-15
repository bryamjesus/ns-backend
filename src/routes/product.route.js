const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", (req, res) => {
  controller.getAllProducts(res);
});

router.get("/:id", (req, res) => {
  controller.getOneProduct(req, res);
});

router.post("/", (req, res) => {
  controller.createProduct(req, res);
});

router.put("/:id", (req, res) => {
  controller.updateProduct(req, res);
});

module.exports = router;
