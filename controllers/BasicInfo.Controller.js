const BasicInfo = require("../models/BasicInfo");
const VesselInfo = require("../models/VesselInfo");
const Arrival = require("../models/Arrival");
const Booking = require("../models/Booking");
const new_crews = require("../models/newCrew");
const Departure = require("../models/Departure");
// const BasicInfo = require("../models/BasicInfo");

module.exports = {
  showAllBasicInfo: async (req, res) => {
    try {
      const basicInfo = await BasicInfo.findAll({
        include: [
          {
            model: VesselInfo,
            required: true,
          },
          {
            model: Arrival,
            required: true,
          },
          {
            model: Booking,
            required: true,
          },
          {
            model: new_crews,
            required: true,
          },
          {
            model: Departure,
            required: true,
          },
        ],
      });

      res.status(200).json(basicInfo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addBasicInfo: async (req, res) => {
    const {
      shipping_license_no,
      contact_person,
      cno,
      quaratine_facility,
      quaratine_address,
      quaratine_cno,
      callsign,
      shipping_agency_name,
      crew_service_boat,
      vehicle_type,
      vehicle_model,
      vehicle_plate_no,
      driver_name,
      driver_cno,
      e_add,
    } = req.body;

    try {
      const newBasicInfo = await BasicInfo.create({
        shipping_license_no,
        contact_person,
        cno,
        quaratine_facility,
        quaratine_address,
        quaratine_cno,
        callsign,
        shipping_agency_name,
        crew_service_boat,
        vehicle_type,
        vehicle_model,
        vehicle_plate_no,
        driver_name,
        driver_cno,
        e_add,
      });

      res.status(201).json(newBasicInfo);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  // updateAgent: async (req, res) => {
  //   const { e_add, shipping_agent_name, contact_person, contact_no } = req.body;

  //   if (shipping_agent_name != null) {
  //     res.shippingAgent.shipping_agent_name = shipping_agent_name;
  //   }

  //   if (e_add != null) {
  //     res.shippingAgent.e_add = e_add;
  //   }

  //   if (contact_person != null) {
  //     res.shippingAgent.contact_person = contact_person;
  //   }

  //   if (contact_no != null) {
  //     res.shippingAgent.contact_no = contact_no;
  //   }

  //   try {
  //     const updatedShippingAgent = await res.shippingAgent.save();
  //     res.json(updatedShippingAgent);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
  getBasicDetails: async (req, res, next) => {
    let BasicDetails;
    try {
      BasicDetails = await BasicInfo.findByPk(req.params.id);
      if (BasicDetails == null)
        return res.status(404).json({ message: "cannot find basic Details" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.BasicDetails = BasicDetails;
    next();
  },
  getSingleData: async (req, res) => {
    try {
      res.status(201).json(res.BasicDetails);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteBasicDetails: async (req, res) => {
    try {
      await res.BasicDetails.destroy();

      res.json({ message: "Deleted basic Details" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
