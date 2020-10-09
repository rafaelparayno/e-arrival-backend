const Vessels = require("../models/Vessel");
const ShippingAgent = require("../models/ShippingAgent");

module.exports = {
  addVessels: async (req, res) => {
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
  },
  getAllVessel: async (req, res) => {
    try {
      const vessels = await Vessels.findAll({
        include: [ShippingAgent],
      });

      res.status(200).json(vessels);
    } catch (err) {
      res.status(500).send();
    }
  },
  updateVessel: async (req, res) => {
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

    if (vessel_name != null) {
      res.vessel.name = vessel_name;
    }

    if (vessel_flag != null) {
      res.vessel.vessel_flag = vessel_flag;
    }

    if (imonumber != null) {
      res.vessel.imonumber = imonumber;
    }

    if (GRT != null) {
      res.vessel.GRT = GRT;
    }

    if (DWT != null) {
      res.vessel.DWT = DWT;
    }

    if (LOA != null) {
      res.vessel.LOA = LOA;
    }

    if (NRT != null) {
      res.vessel.NRT = NRT;
    }

    if (breadth != null) {
      res.vessel.breadth = breadth;
    }

    if (shipping_agent_id != null) {
      res.vessel.shipping_agent_id = shipping_agent_id;
    }

    if (callsign != null) {
      res.vessel.callsign = callsign;
    }

    try {
      const updatedVessel = await res.vessel.save();
      res.json(updatedVessel);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getVessel: async (req, res, next) => {
    let vessel;
    try {
      vessel = await Vessels.findByPk(req.params.id);
      if (vessel == null)
        return res.status(404).json({ message: "cannot find Vessel" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.vessel = vessel;
    next();
  },
  deleteVessel: async (req, res) => {
    try {
      await res.vessel.destroy();

      res.json({ message: "Deleted vessel" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
