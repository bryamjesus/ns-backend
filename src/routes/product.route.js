const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", (req, res) => {
  controller.getAllProducts(res);
});

router.post('/',(req,res) => {
  controller.createProduct(req,res)
})

module.exports = router