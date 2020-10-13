const express = require("express");
const router = express.Router();
const BookingController = require("../controllers/Booking.Controller");
const auth = require("../middleware/auth");

router.get("/", auth.authenticateToken, BookingController.getAllBooking);

router.post("/", auth.authenticateToken, BookingController.addBooking);

router.post(
  "/vessel",
  auth.authenticateToken,
  BookingController.getVesselBooking
);

router.patch(
  "/:id",
  auth.authenticateToken,
  BookingController.getBooking,
  BookingController.updateBooking
);

router.delete(
  "/:id",
  auth.authenticateToken,
  BookingController.getBooking,
  BookingController.deleteBooking
);
module.exports = router;
