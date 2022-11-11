const { Schema, model } = require("mongoose");
const { defaultSchema, basicSchema } = require("../shared/utils/schema.utils");

const categorySchema = new Schema(
  {
    name: basicSchema,
    estado: defaultSchema(), //
  },
  { versionKey: false }
);

module.exports = model("category", categorySchema);
