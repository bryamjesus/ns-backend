const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  controller.getAllProducts(res);
});

router.get("/:id", (req, res) => {
  controller.getOneProduct(req, res);
});

router.post("/payment-gateway", (req, res) => {
  controller.paymentGateway(req, res);
});

router.post("/suggestion", (req, res) => {
  controller.getSuggestionEvent(req, res);
});

router.post("/", auth, (req, res) => {
  controller.createProduct(req, res);
});

router.put("/:id", auth, (req, res) => {
  controller.updateProduct(req, res);
});

router.put("/all/:id", auth, (req, res) => {
  controller.updateAllProduct(req, res);
});

module.exports = router;
