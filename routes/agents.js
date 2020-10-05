const express = require("express");
const router = express.Router();

const ShippingAgents = require("../models/ShippingAgent");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const agents = await ShippingAgents.findAll();

    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
