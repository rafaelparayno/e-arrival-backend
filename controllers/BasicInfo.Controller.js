const BasicInfo = require("../models/BasicInfo");

module.exports = {
  showAllBasicInfo: async (req, res) => {
    try {
      const basicInfo = await BasicInfo.findAll();

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
  // getShippingAgent: async (req, res, next) => {
  //   let shippingAgent;
  //   try {
  //     shippingAgent = await ShippingAgents.findByPk(req.params.id);
  //     if (shippingAgent == null)
  //       return res.status(404).json({ message: "cannot find shipping agent" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //   res.shippingAgent = shippingAgent;
  //   next();
  // },
  // getSingleData: async (req, res) => {
  //   try {
  //     res.status(201).json(res.shippingAgent);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // deleteAgent: async (req, res) => {
  //   try {
  //     await res.shippingAgent.destroy();

  //     res.json({ message: "Deleted shipping agent" });
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
};
