const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/Booking.Controller");
const auth = require("../middleware/auth");

router.get("/", BookingController.getAllBooking);

router.get("/basic/:id", BookingController.getBasicBooking);

router.post("/", BookingController.addBooking);

// router.post(
//   "/vessel",
//   auth.authenticateToken,
//   BookingController.getVesselBooking
// );

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
