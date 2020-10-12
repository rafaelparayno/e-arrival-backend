const Vessel = require("../models/Vessel");
const Departure = require("../models/Departure");

module.exports = {
  getAllDeparture: async (req, res) => {
    try {
      const departures = await Departure.findAll({
        include: [Vessel],
      });

      res.status(200).json(departures);
    } catch (err) {
      res.status(500).send();
    }
  },
  addDeparture: async (req, res) => {
    const { date, time, vessels_id, portcall } = req.body;

    try {
      const newDeparture = await Departure.create({
        date,
        time,
        vessels_id,
        portcall,
      });

      res.status(201).json(newDeparture);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  //   getArrival: async (req, res, next) => {
  //     let arrival;
  //     try {
  //       arrival = await Arrival.findByPk(req.params.id);
  //       if (arrival == null)
  //         return res.status(404).json({ message: "cannot find arrival" });
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //     res.arrival = arrival;
  //     next();
  //   },
  //   deleteArrival: async (req, res) => {
  //     try {
  //       await res.arrival.destroy();

  //       res.json({ message: "Deleted arrival" });
  //     } catch (err) {
  //       res.status(400).json({ message: err.message });
  //     }
  //   },
};
