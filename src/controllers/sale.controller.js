const mercadopago = require('mercadopago');
const saleModel = require('../models/sale.model');

mercadopago.configure({
  access_token: 'TEST-5820761297297918-120322-73737303b0c16183bf96936208d25320-671931691'
});
/**
 * TODO: 3H 16min seguir para implementación
 */
const controller = {
  async getAllSales(req, res) {
    try {
      const results = await saleModel.find();
      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el listado');
    }
  },
  async createSale(req, res) {
    try {
      const { client_id, total, detail } = req.body;
      const sale = new saleModel();
      sale.client_id = client_id;
      sale.total = total;
      sale.detail = detail;
      const result = await sale.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al guardar la venta');
    }
  },
  async getOneSaleForIdCliente(req, res) {
    try {
      const { idcliente } = req.params;
      const result = await saleModel.find({ cliente_id: idcliente });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error en el listado');
    }
  },
  async mercadoPago(req, res) {
    const { client_id, total, detail } = req.body;
    const sale = new saleModel();
    sale.client_id = client_id;
    sale.total = total;
    sale.detail = detail;
    const result = await sale.save();

    let preference = {
      items: [
        {
          title: "Tienda NachoStore",
          unit_price: total,
          currency_id: 'PEN',
          quantity: 1
        },
      ],
      back_urls: {
        success: "http://127.0.0.1:5173/cart-shopping/confirmation",
        failure: "http://127.0.0.1:5173/cart-shopping/confirmation",
        pending: "http://127.0.0.1:5173/cart-shopping/confirmation"
      },
      auto_return: "approved",
      external_reference: result._id.toString() // Envío el id de la venta creada
    };

    // Paso3: Enviar la venta a MercadoPago
    mercadopago.preferences.create(preference).then(function (response) {
      // Obtenemos la respuesta de MercadoPago
      console.log('MercadoPago response.body => ', response.body);
      res.json({ url: response.body.init_point }); // Obtenemos la url del pago
    }).catch(function (error) {
      console.log('MercadoPago Error => ', error);
      res.sendStatus(500);
    });
  },
  async updateSale(req, res) {
    const { idventa } = req.params;
    const { transaction, state } = req.body;
    try {
      const datos = {
        transaction,
        state
      };
      const result = await saleModel.findByIdAndUpdate(idventa, datos);
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
}

module.exports = controller;