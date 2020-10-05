const express = require("express");
const router = express.Router();
const Vessels = require("../models/Vessel");
const ShippingAgent = require("../models/ShippingAgent");

router.get("/", async (req, res) => {
  try {
    const vessels = await Vessels.findAll({
      include: [ShippingAgent],
    });

    res.status(200).json(vessels);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
