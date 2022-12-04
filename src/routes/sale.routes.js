const express = require("express");
const router = express.Router();
const controller = require("../controllers/sale.controller");

router.get('/', (req, res) => {
  controller.getAllSales(req, res);
});

router.get('/:idcliente', (req, res) => {
  controller.getOneSaleForIdCliente(req, res);
});

router.post('/', (req, res) => {
  controller.createSale(req, res);
});

router.post('/mercadopago', (req, res) => {
  controller.mercadoPago(req, res);
});

router.put('/:idventa', (req, res) => {
  controller.updateSale(req, res);
});
module.exports = router;