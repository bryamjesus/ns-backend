const basicSchema = { type: String, require: true };

// const defaultSchema = { type: String, default: "A" }
const defaultSchema = (textDefult = "A") => {
  return { type: String, default: textDefult };
};

const numberBasic = { type: Number, required: true };

module.exports = {
  basicSchema,
  defaultSchema,
  numberBasic,
};
