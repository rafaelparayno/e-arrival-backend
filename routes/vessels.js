const express = require("express");
const router = express.Router();
const VesselController = require("../controllers/Vessel.Controller");
const auth = require("../middleware/auth");

router.get("/", auth.authenticateToken, VesselController.getAllVessel);

router.post("/", auth.authenticateToken, VesselController.addVessels);

router.patch(
  "/:id",
  auth.authenticateToken,
  VesselController.getVessel,
  VesselController.updateVessel
);

router.delete(
  "/:id",
  auth.authenticateToken,
  VesselController.getVessel,
  VesselController.deleteVessel
);

module.exports = router;
