const { Schema, model } = require("mongoose");
const { defaultSchema } = require("../shared/utils/schema.utils");

const categorySchema = new Schema(
  {
    name: defaultSchema,
    estado: { type: String, default: "A" }, //
  },
  { versionKey: false }
);

module.exports = model("category", categorySchema);
