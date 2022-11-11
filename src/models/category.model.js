const mongoose = require("mongoose");
const { defaultSchema, basicSchema } = require("../shared/utils/schema.utils");
const Schema = mongoose.Schema

const categorySchema = new Schema(
  {
    name: basicSchema,
    estado: defaultSchema(), //
  },
  { versionKey: false }
);

module.exports = mongoose.model("category", categorySchema);
