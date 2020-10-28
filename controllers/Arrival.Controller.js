const Vessel = require("../models/Vessel");
const Arrival = require("../models/Arrival");
const { Op, literal } = require("sequelize");

module.exports = {
  getAllArival: async (req, res) => {
    try {
      const arrival = await Arrival.findAll({
        // include: [Vessel],
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
      basic_info_id,
      draft,
      berth,
      purpose,
      discharged,
      loaded,
      volume,
    } = req.body;

    try {
      const newArrival = await Arrival.create({
        date,
        time,
        basic_info_id,
        draft,
        berth,
        purpose,
        discharged,
        loaded,
        volume,
      });

      res.status(201).json(newArrival);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getBasicArrival: async (req, res) => {
    try {
      const arrival = await Arrival.findOne({
        where: {
          basic_info_id: req.params.id,
        },
      });
      if (arrival == null)
        return res.status(404).json({ message: "cannot find arrival" });

      res.status(201).json(arrival);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // getArrivalToday: async (req, res) => {
  //   const { date } = req.body;

  //   try {
  //     if (date == null)
  //       return res.status(404).json({ message: "cannot find arrivals" });

  //     const arrivals = await Arrival.findAll({
  //       include: [
  //         {
  //           model: Vessel,
  //           attributes: {
  //             include: [
  //               [
  //                 // Note the wrapping parentheses in the call below!
  //                 literal(`(
  //                       SELECT COUNT(*)
  //                       FROM crews AS crew
  //                       WHERE
  //                           crew.vessels_id = arrivals.vessels_id
  //                           AND
  //                           crew.is_fil = 1
  //                           AND
  //                           crew.status = 1
  //                   )`),
  //                 "signinFil",
  //               ],
  //               [
  //                 // Note the wrapping parentheses in the call below!
  //                 literal(`(
  //                       SELECT COUNT(*)
  //                       FROM crews AS crew
  //                       WHERE
  //                           crew.vessels_id = arrivals.vessels_id
  //                           AND
  //                           crew.is_fil = 1
  //                           AND
  //                           crew.status = 0
  //                   )`),
  //                 "signOutFil",
  //               ],
  //               [
  //                 // Note the wrapping parentheses in the call below!
  //                 literal(`(
  //                       SELECT COUNT(*)
  //                       FROM crews AS crew
  //                       WHERE
  //                           crew.vessels_id = arrivals.vessels_id
  //                           AND
  //                           crew.is_fil = 0
  //                           AND
  //                           crew.status = 1
  //                   )`),
  //                 "signinForeign",
  //               ],
  //               [
  //                 // Note the wrapping parentheses in the call below!
  //                 literal(`(
  //                       SELECT COUNT(*)
  //                       FROM crews AS crew
  //                       WHERE
  //                           crew.vessels_id = arrivals.vessels_id
  //                           AND
  //                           crew.is_fil = 0
  //                           AND
  //                           crew.status = 0
  //                   )`),
  //                 "signOutForeign",
  //               ],
  //             ],
  //           },
  //           required: true,
  //         },
  //       ],
  //       where: {
  //         date: date,
  //       },
  //     });
  //     res.status(200).json(arrivals);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // getArrival: async (req, res, next) => {
  //   let arrival;
  //   try {
  //     arrival = await Arrival.findByPk(req.params.id);
  //     if (arrival == null)
  //       return res.status(404).json({ message: "cannot find arrival" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //   res.arrival = arrival;
  //   next();
  // },
  // getVesselArrival: async (req, res) => {
  //   const { shipping_id } = req.body;

  //   try {
  //     if (shipping_id == null)
  //       return res.status(404).json({ message: "cannot find Vessel" });

  //     const arrivals = await Arrival.findAll({
  //       include: [
  //         {
  //           model: Vessel,
  //           where: {
  //             shipping_agent_id: shipping_id,
  //           },
  //           required: true,
  //         },
  //       ],
  //     });
  //     res.status(200).json(arrivals);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // deleteArrival: async (req, res) => {
  //   try {
  //     await res.arrival.destroy();

  //     res.json({ message: "Deleted arrival" });
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
};
