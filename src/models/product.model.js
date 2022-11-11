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
    imagen: defaultSchema("default.png"),
    precio: numberBasic,
    estado: defaultSchema(),
  },
  {
    versionKey: false,
  }
);

module.exports = model("product", productSchema);
