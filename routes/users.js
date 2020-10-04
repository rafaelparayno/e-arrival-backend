require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const Useraccounts = require("../models/Useraccount");
const jwt = require("jsonwebtoken");

//const auth = require('../middleware/auth');
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
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
      const accessToken = generateAccessToken({ user });
      const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);

      res.json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.send("not allowed");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

module.exports = router;
