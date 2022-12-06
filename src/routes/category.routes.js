const express = require("express");
const controller = require("../controllers/category.controller");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  controller.getAllCategories(res);
});

router.get("/:id", auth, (req, res) => {
  controller.getOneCategory(req, res);
});

router.post("/", auth, (req, res) => {
  controller.createCategory(req, res);
});

router.put("/:id", auth, (req, res) => {
  controller.updateCategory(req, res);
});

router.delete('/:id', auth, (req, res) => {
  controller.deleteCategory(req, res)
})

module.exports = router;
