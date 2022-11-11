const mongoose = require("mongoose");
const { defaultSchema, basicSchema } = require("../shared/utils/schema.utils");
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    name: basicSchema,
    state: defaultSchema(), // A:activo | I:inactivo
  },
  { versionKey: false }
);

module.exports = mongoose.model("category", categorySchema);
