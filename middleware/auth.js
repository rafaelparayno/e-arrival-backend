require("dotenv").config();

const jwt = require("jsonwebtoken");
const client = require("../helpers/init_redis");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const userjwt = user;

    client.GET(userjwt.username, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (result) req.user = userjwt;
      next();
      return;
    });
  });
}

function verifyRefreshToken(req, res, next) {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err.message);
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
  verifyRefreshToken,
};
