const express = require("express");
const router = express.Router();
const VesselInfoController = require("../controllers/VesselInfos.Controller");
const auth = require("../middleware/auth");

router.get("/", VesselInfoController.getAllVesselInfo);

router.get("/basic/:id", VesselInfoController.getBasicVesselInfo);

router.post("/", VesselInfoController.addVessels);

// // router.post("/agent", auth.authenticateToken, VesselController.getAgentVessel);

// // router.patch(
// //   "/:id",
// //   auth.authenticateToken,
// //   VesselController.getVessel,
// //   VesselController.updateVessel
// // );

// // router.delete(
// //   "/:id",
// //   auth.authenticateToken,
// //   VesselController.getVessel,
// //   VesselController.deleteVessel
// // );

module.exports = router;
