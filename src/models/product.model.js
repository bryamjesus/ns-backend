const { Schema, model } = require("mongoose");
const {
  basicSchema,
  defaultSchema,
  numberBasic,
} = require("../shared/utils/schema.utils");

const productSchema = new Schema(
  {
    name: basicSchema,
    description: basicSchema,
    stock: numberBasic,
    image: defaultSchema("default.png"),
    price: numberBasic,
    state: defaultSchema(), // A:activo | I:inactivo
    category: [
      {
        categoryId: { type: Schema.ObjectId, ref: "category", required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = model("product", productSchema);
