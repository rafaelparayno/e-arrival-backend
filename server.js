const express = require("express");
const app = express();
const cors = require('cors');
const db = require("./config/database");



db.authenticate()
  .then(() => console.log("database connected..."))
  .catch((err) => console.log("error message :" + err));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => res.send("Index"));

app.use("/users", require("./routes/users"));

app.use("/agents", require("./routes/agents"));

app.use("/vessels", require("./routes/vessels"));

app.use("/crews", require("./routes/crews"));

app.use("/bookings", require("./routes/booking"));

app.use("/arrivals", require("./routes/arrival"));

app.use(async (req, res, next) => {
  const error = new Error("not Found");
  error.status = 404;

  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
