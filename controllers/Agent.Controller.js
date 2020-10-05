const ShippingAgents = require("../models/ShippingAgent");
const { Op } = require("sequelize");

module.exports = {
  showAllAgents: async (req, res) => {
    try {
      const agents = await ShippingAgents.findAll();

      res.status(200).json(agents);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addAgent: async (req, res) => {
    const { e_add, shipping_agent_name, contact_person, contact_no } = req.body;

    try {
      const newShippingAgent = await ShippingAgents.create({
        e_add,
        shipping_agent_name,
        contact_person,
        contact_no,
      });

      res.status(201).json(newShippingAgent);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  updateAgent: async (req, res) => {
    const { e_add, shipping_agent_name, contact_person, contact_no } = req.body;

    if (shipping_agent_name != null) {
      res.shippingAgent.shipping_agent_name = shipping_agent_name;
    }

    if (e_add != null) {
      res.shippingAgent.e_add = e_add;
    }

    if (contact_person != null) {
      res.shippingAgent.contact_person = contact_person;
    }

    if (contact_no != null) {
      res.shippingAgent.contact_no = contact_no;
    }

    try {
      const updatedShippingAgent = await res.shippingAgent.save();
      res.json(updatedShippingAgent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getShippingAgent: async (req, res, next) => {
    let shippingAgent;
    try {
      shippingAgent = await ShippingAgents.findByPk(req.params.id);
      if (shippingAgent == null)
        return res.status(404).json({ message: "cannot find shipping agent" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.shippingAgent = shippingAgent;
    next();
  },
};
