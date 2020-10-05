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

router.post("/", async (req, res) => {
  const {
    vessel_name,
    vessel_flag,
    imonumber,
    GRT,
    DWT,
    NRT,
    LOA,
    breadth,
    callsign,
    shipping_agent_id,
  } = req.body;

  try {
    const newVessels = await Vessels.create({
      name: vessel_name,
      vessel_flag,
      imonumber,
      GRT,
      DWT,
      NRT,
      LOA,
      breadth,
      callsign,
      shipping_agent_id,
    });

    res.status(201).json(newVessels);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
