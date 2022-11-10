const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h2>Hola Nacho Store</h2>");
});

app.listen(PORT, () => console.log(`🚀 API is listening on port ${PORT}`));
