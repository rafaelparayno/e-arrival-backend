const express = require("express");
const app = express();
const db = require("./config/database");

db.authenticate()
  .then(() => console.log("database connected..."))
  .catch((err) => console.log("error message :" + err));

app.use(express.json());

app.get("/", (req, res) => res.send("Index"));

app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
