const Vessel = require("../models/Vessel");
const Arrival = require("../models/Arrival");

module.exports = {
  getAllArival: async (req, res) => {
    try {
      const arrival = await Arrival.findAll({
        include: [Vessel],
      });

      res.status(200).json(arrival);
    } catch (err) {
      res.status(500).send();
    }
  },
  addArrival: async (req, res) => {
    const {
      date,
      time,
      vessels_id,
      draft,
      berth,
      purpose,
      discharged,
      loaded,
    } = req.body;

    try {
      const newArrival = await Arrival.create({
        date,
        time,
        vessels_id,
        draft,
        berth,
        purpose,
        discharged,
        loaded,
      });

      res.status(201).json(newArrival);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getArrival: async (req, res, next) => {
    let arrival;
    try {
      arrival = await Arrival.findByPk(req.params.id);
      if (arrival == null)
        return res.status(404).json({ message: "cannot find arrival" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.arrival = arrival;
    next();
  },
  getVesselArrival: async (req, res) => {
    const { shipping_id } = req.body;

    try {
      if (shipping_id == null)
        return res.status(404).json({ message: "cannot find Vessel" });

      const arrivals = await Arrival.findAll({
        include: [
          {
            model: Vessel,
            where: {
              shipping_agent_id: shipping_id,
            },
            required: true,
          },
        ],
      });
      res.status(200).json(arrivals);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteArrival: async (req, res) => {
    try {
      await res.arrival.destroy();

      res.json({ message: "Deleted arrival" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
