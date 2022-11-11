const { Schema, model } = require("mongoose");
const { basicSchema, defaultSchema } = require("../shared/utils/schema.utils");

const userSchema = new Schema(
  {
    typeUser: basicSchema, // A:admin | U:usuario
    allName: basicSchema,
    email: basicSchema,
    password: basicSchema,
    state: defaultSchema(), // A:activo | I:inactivo
  },
  { versionKey: false }
);

module.exports = model("user", userSchema);
