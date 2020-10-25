const VesselInfo = require("../models/VesselInfo");
const BasicInfo = require("../models/BasicInfo");

module.exports = {
  addVessels: async (req, res) => {
    const {
      vessel_name,
      flag_registry,
      voyage_no,
      grt,
      nrt,
      dwt,
      loa,
      breadth,
      name_last_port,
      departure_last_port,
      basic_info_id,
    } = req.body;

    try {
      const newVessels = await VesselInfo.create({
        name: vessel_name,
        flag_registry,
        voyage_no,
        grt,
        dwt,
        nrt,
        loa,
        breadth,
        name_last_port,
        departure_last_port,
        basic_info_id,
      });

      res.status(201).json(newVessels);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getAllVesselInfo: async (req, res) => {
    try {
      const vessels = await VesselInfo.findAll({
        // include: [ShippingAgent],
      });

      res.status(200).json(vessels);
    } catch (err) {
      res.status(500).send();
    }
  },
  //   getAgentVessel: async (req, res) => {
  //     const { vessel_id } = req.body;

  //     try {
  //       if (vessel_id == null)
  //         return res.status(404).json({ message: "cannot find Vessel" });

  //       const vessels = await Vessel.findAll({
  //         where: {
  //           shipping_agent_id: vessel_id,
  //         },
  //       });
  //       res.status(200).json(vessels);
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   },
  //   updateVessel: async (req, res) => {
  //     const {
  //       vessel_name,
  //       vessel_flag,
  //       imonumber,
  //       GRT,
  //       DWT,
  //       NRT,
  //       LOA,
  //       breadth,
  //       callsign,
  //       shipping_agent_id,
  //     } = req.body;

  //     if (vessel_name != null) {
  //       res.vessel.name = vessel_name;
  //     }

  //     if (vessel_flag != null) {
  //       res.vessel.vessel_flag = vessel_flag;
  //     }

  //     if (imonumber != null) {
  //       res.vessel.imonumber = imonumber;
  //     }

  //     if (GRT != null) {
  //       res.vessel.GRT = GRT;
  //     }

  //     if (DWT != null) {
  //       res.vessel.DWT = DWT;
  //     }

  //     if (LOA != null) {
  //       res.vessel.LOA = LOA;
  //     }

  //     if (NRT != null) {
  //       res.vessel.NRT = NRT;
  //     }

  //     if (breadth != null) {
  //       res.vessel.breadth = breadth;
  //     }

  //     if (shipping_agent_id != null) {
  //       res.vessel.shipping_agent_id = shipping_agent_id;
  //     }

  //     if (callsign != null) {
  //       res.vessel.callsign = callsign;
  //     }

  //     try {
  //       const updatedVessel = await res.vessel.save();
  //       res.json(updatedVessel);
  //     } catch (err) {
  //       res.status(400).json({ message: err.message });
  //     }
  //   },

  getBasicVesselInfo: async (req, res) => {
    try {
      vessel = await VesselInfo.findOne({
        where: {
          basic_info_id: req.params.id,
        },
      });
      if (vessel == null)
        return res.status(404).json({ message: "cannot find Vessel" });

      res.status(201).json(vessel);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getSingleData: async (req, res) => {
    try {
      res.status(201).json(res.vessel);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getVessel: async (req, res, next) => {
    let vessel;
    try {
      vessel = await VesselInfo.findOne(req.params.id);
      if (vessel == null)
        return res.status(404).json({ message: "cannot find Vessel" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.vessel = vessel;
    next();
  },
  //   deleteVessel: async (req, res) => {
  //     try {
  //       await res.vessel.destroy();

  //       res.json({ message: "Deleted vessel" });
  //     } catch (err) {
  //       res.status(400).json({ message: err.message });
  //     }
  //   },
};
