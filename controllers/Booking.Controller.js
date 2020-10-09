const Booking = require("../models/Booking");
const Vessel = require("../models/Vessel");
const { Op } = require("sequelize");

module.exports = {
  addBooking: async (req, res) => {
    const { date, time, vessels_id } = req.body;

    try {
      const newBooking = await Booking.create({
        date,
        time,
        vessels_id,
      });

      res.status(201).json(newBooking);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
  getAllBooking: async (req, res) => {
    try {
      const booking = await Booking.findAll({
        include: [Vessel],
      });

      res.status(200).json(booking);
    } catch (err) {
      res.status(500).send();
    }
  },
  updateBooking: async (req, res) => {
    const { date, time, vessels_id } = req.body;

    if (date != null) {
      res.booking.date = date;
    }

    if (time != null) {
      res.booking.time = time;
    }

    if (vessels_id != null) {
      res.booking.vessels_id = vessels_id;
    }

    try {
      const updatedBooking = await res.booking.save();
      res.json(updatedBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  getBooking: async (req, res, next) => {
    let booking;
    try {
      booking = await Booking.findByPk(req.params.id);
      if (booking == null)
        return res.status(404).json({ message: "cannot find Booking" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    res.booking = booking;
    next();
  },
  deleteBooking: async (req, res) => {
    try {
      await res.booking.destroy();

      res.json({ message: "Deleted Booking" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};