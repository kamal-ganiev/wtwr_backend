const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { checkExistence } = require("./utils/errors");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/wtwr_db");
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6369ed0e0f913399a74738ca",
  };
  next();
});

app.use("/users", require("./routes/users"));
app.use("/items", require("./routes/clothingItems"));

app.listen(PORT, () => {
  console.log(`Serving is running on http//:localhost:${PORT}`);
});
