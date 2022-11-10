const { Schema, model } = require("mongoose");
const { defaultSchema } = require("../shared/utils/schema.utils");

const userSchema = new Schema(
  {
    typeUser: defaultSchema,
    allName: defaultSchema,
    email: defaultSchema,
    password: defaultSchema,
    state: { type: String, default: "A" }, // A:activo | I:inactivo
  },
  { versionKey: false }
);

module.exports = model("user", userSchema);
