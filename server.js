const express = require("express");

const db = require("./config/database");

db.authenticate()
  .then(() => console.log("database connected..."))
  .catch((err) => console.log("error message :" + err));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
