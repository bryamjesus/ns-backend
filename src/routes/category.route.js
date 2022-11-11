const express = require("express");
const controller = require("../controllers/category.controller");
const router = express.Router();

router.get("/", (req, res) => {
  controller.getAllCategory(res);
});

router.get("/:id", (req, res) => {
  controller.getOneCategory(req, res);
});

router.post("/", (req, res) => {
  controller.createCategory(req, res);
});

router.put("/:id", (req, res) => {
  controller.updateCategory(req, res);
});

router.delete('/:id', (req,res) => {
  controller.deleteCategory(req,res)
})

module.exports = router;
