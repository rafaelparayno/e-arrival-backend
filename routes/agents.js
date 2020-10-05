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

router.post("/", async (req, res) => {
  const { e_add, contact_person, contact_no } = req.body;

  try {
    const newShippingAgent = await ShippingAgents.create({
      e_add,
      contact_person,
      contact_no,
    });

    res.status(201).json(newShippingAgent);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
