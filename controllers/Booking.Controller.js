const Booking = require("../models/Booking");
const BasicInfo = require("../models/BasicInfo");
const VesselInfo = require("../models/VesselInfo");
const NewCrew = require("../models/newCrew");

module.exports = {
  addBooking: async (req, res) => {
    const { date, time, basic_info_id } = req.body;

    try {
      const newBooking = await Booking.create({
        date,
        time,
        basic_info_id,
      });

      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getAllBooking: async (req, res) => {
    try {
      const booking = await Booking.findAll({
        include: [
          {
            model: BasicInfo,
            required: true,
            include: [
              {
                model: VesselInfo,
                require: true,
              },
              {
                model: NewCrew,
                require: true,
              },
            ],
          },
        ],
      });

      res.status(200).json(booking);
    } catch (err) {
      res.status(500).send();
    }
  },
  getBasicBooking: async (req, res) => {
    try {
      const booking = await Booking.findOne({
        where: {
          basic_info_id: req.params.id,
        },
      });
      if (booking == null)
        return res.status(404).json({ message: "cannot find booking" });

      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  // getVesselBooking: async (req, res) => {
  //   const { shipping_id } = req.body;

  //   try {
  //     if (shipping_id == null)
  //       return res.status(404).json({ message: "cannot find Vessel" });

  //     const bookinngs = await Booking.findAll({
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
  //     res.status(200).json(bookinngs);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // },
  // updateBooking: async (req, res) => {
  //   const { date, time, vessels_id } = req.body;

  //   if (date != null) {
  //     res.booking.date = date;
  //   }

  //   if (time != null) {
  //     res.booking.time = time;
  //   }

  //   if (vessels_id != null) {
  //     res.booking.vessels_id = vessels_id;
  //   }

  //   try {
  //     const updatedBooking = await res.booking.save();
  //     res.json(updatedBooking);
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
  // getBooking: async (req, res, next) => {
  //   let booking;
  //   try {
  //     booking = await Booking.findByPk(req.params.id);
  //     if (booking == null)
  //       return res.status(404).json({ message: "cannot find Booking" });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //   res.booking = booking;
  //   next();
  // },
  // deleteBooking: async (req, res) => {
  //   try {
  //     await res.booking.destroy();

  //     res.json({ message: "Deleted Booking" });
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // },
};
