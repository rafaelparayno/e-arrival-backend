const express = require("express");
const router = express.Router();
const ArrivalController = require("../controllers/Arrival.Controller");
const auth = require("../middleware/auth");

router.get("/", auth.authenticateToken, ArrivalController.getAllArival);

router.post("/", auth.authenticateToken, ArrivalController.addArrival);

router.post(
  "/vessel",
  auth.authenticateToken,
  ArrivalController.getVesselArrival
);

router.post("/today", ArrivalController.getArrivalToday);

//router.patch("/:id", ArrivalController.addArrival);

router.delete(
  "/:id",
  auth.authenticateToken,
  ArrivalController.getArrival,
  ArrivalController.deleteArrival
);

module.exports = router;
