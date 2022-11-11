const { Schema, model } = require("mongoose");
const {
  basicSchema,
  defaultSchema,
  numberBasic,
} = require("../shared/utils/schema.utils");

const productSchema = new Schema(
  {
    categoryId: { type: Schema.ObjectId, ref: "category", required: true },
    name: basicSchema,
    image: defaultSchema("default.png"),
    price: numberBasic,
    state: defaultSchema(), // A:activo | I:inactivo
  },
  {
    versionKey: false,
  }
);

module.exports = model("product", productSchema);
