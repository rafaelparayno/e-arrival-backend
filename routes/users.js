require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const Useraccounts = require("../models/Useraccount");
const jwt = require("jsonwebtoken");
const client = require("../helpers/init_redis");

const auth = require("../middleware/auth");
const { Op } = require("sequelize");

router.get("/", auth, async (req, res) => {
  try {
    const users = await Useraccounts.findAll({
      where: {
        [Op.not]: [{ role_id: 3 }],
      },
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json;
  }
});

router.post("/add", async (req, res) => {
  const hashedPasswored = await bcrpyt.hash(req.body.password, 10);

  const data = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    username: req.body.username,
    password: hashedPasswored,
    role_id: 0,
  };

  try {
    const newUsers = await Useraccounts.create(data);
    res.status(201).json(newUsers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Useraccounts.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user == null) return res.status(400).send("cannot find user");

    if (await bcrpyt.compare(req.body.password, user.password)) {
      const accessToken = generateAccessToken({ username: user.username });
      const refreshToken = generateRefreshToken({ username: user.username });

      client.SETEX(user.username, 1800 * 60, refreshToken, (err, reply) => {
        if (err) return res.status(500).send({ message: err.message });

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      });

      // res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/token", verifyRefreshToken, async (req, res) => {
  try {
    const userName = req.user.username;
    const accessToken = generateAccessToken({ username: userName });
    const refreshToken = generateRefreshToken({ username: userName });

    client.GET(userName, (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      if (req.body.token === result) {
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/logout", verifyRefreshToken, async (req, res) => {
  try {
    client.DEL(req.user.username, (err, val) => {
      if (err) return res.status(500).json({ message: err.message });

      console.log(val);
      res.sendStatus(204);
    });
    // res.send(res.user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15m",
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

module.exports = router;
