const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const salesRoutes = require("./routes/sale.routes");
const auth = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1/nacho_store")
  .then(() => console.log("Connected to the base"))
  .catch((error) => console.log(`Failed to connect to db: ${error}`));

app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use(express.static("public"));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use(auth);
app.use("/api/sales", salesRoutes);

app.listen(PORT, () => console.log(`🚀 API is listening on port ${PORT}`));
