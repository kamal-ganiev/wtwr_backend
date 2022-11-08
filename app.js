const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/WhatToWearDB");

app.listen(PORT, () => {
  console.log(`Serving is running on http//:localhost:${PORT}`);
});
