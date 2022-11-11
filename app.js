const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/wtwr_db");
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "636d9e599dbf25f40d185fc2",
  };

  next();
});

app.use("/items", require("./routes/clothingItems"));
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Serving is running on http//:localhost:${PORT}`);
});
