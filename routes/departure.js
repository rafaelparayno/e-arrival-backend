const express = require("express");
const router = express.Router();
const DepartureController = require("../controllers/Departure.Controller");
// const BookingController = require("../controllers/Booking.Controller");
const auth = require("../middleware/auth");

router.get("/", DepartureController.getAllDeparture);

router.post("/", DepartureController.addDeparture);

// router.post("/vessel", DepartureController.getVesselDeparture);

// router.patch(
//   "/:id",
//   auth.authenticateToken,
//   BookingController.getBooking,
//   BookingController.updateBooking
// );

// router.delete(
//   "/:id",
//   auth.authenticateToken,
//   BookingController.getBooking,
//   BookingController.deleteBooking
// );
module.exports = router;
