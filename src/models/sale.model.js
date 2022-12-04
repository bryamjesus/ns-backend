const { Schema, model } = require("mongoose");
const { numberBasic, basicSchema } = require("../shared/utils/schema.utils");

const saleModel = new Schema({
  client_id: { type: Schema.ObjectId, ref: 'user', required: true },
  total: numberBasic,
  date: { type: Date, default: Date.now() },
  detail: [{
    product: basicSchema,
    price: numberBasic,
    amount: numberBasic
  }],
  transaction: { type: String }, // Código de transacción de la pasarela
  state: { type: String, default: 'S' } // S:sin pagar | P:pagado | E:entregado | N:anulado 
})

module.exports = model("sale", saleModel);
