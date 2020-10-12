const Crew = require("../models/Crew");
const Vessel = require("../models/Vessel");
const { Op, fn, col } = require("sequelize");

module.exports = {
  addCrew: async (req, res) => {
    const {
      firstname,
      middlename,
      lastname,
      is_fil,
      status,
      vessels_id,
    } = req.body;

    try {
      const newCrew = await Crew.create({
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        is_fil,
        status,
        vessels_id,
      });

      res.status(201).json(newCrew);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getAllCrew: async (req, res) => {
    try {
      const crews = await Crew.findAll({
        include: [Vessel],
      });

      res.status(200).json(crews);
    } catch (err) {
      res.status(500).send();
    }
  },
  getVesselCrew: async (req, res) => {
    const { vessel_id } = req.body;

    try {
      if (vessel_id == null)
        return res.status(404).json({ message: "cannot find Vessel" });

      const crews = await Crew.findAll({
        attributes: {
          include: [[fn("concat", col("c_fn"), " ", col("c_ln")), "fullname"]],
        },
        where: {
          vessels_id: vessel_id,
        },
      });
      res.status(200).json(crews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateCrew: async (req, res) => {
    const {
      firstname,
      middlename,
      lastname,
      is_fil,
      status,
      vessels_id,
    } = req.body;

    if (firstname != null) {
      res.crew.firstname = firstname;
    }

    if (middlename != null) {
      res.crew.middlename = middlename;
    }

    if (lastname != null) {
      res.crew.lastname = lastname;
    }

    if (is_fil != null) {
      res.crew.is_fil = is_fil;
    }

    if (status != null) {
      res.crew.status = status;
    }

    if (vessels_id != null) {
      res.vessel.vessels_id = vessels_id;
    }

    try {
      const updatedCrew = await res.crew.save();
      res.json(updatedCrew);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getCrew: async (req, res, next) => {
    let crew;
    try {
      crew = await Crew.findByPk(req.params.id);
      if (crew == null)
        return res.status(404).json({ message: "cannot find Crew" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.crew = crew;
    next();
  },
  deleteCrew: async (req, res) => {
    try {
      await res.crew.destroy();

      res.json({ message: "Deleted crew" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
