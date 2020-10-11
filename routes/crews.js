const express = require("express");
const router = express.Router();
const CrewController = require("../controllers/Crew.Controller");
const auth = require("../middleware/auth");

router.get("/", auth.authenticateToken, CrewController.getAllCrew);

router.post("/", auth.authenticateToken, CrewController.addCrew);

router.post("/vessel", auth.authenticateToken, CrewController.getVesselCrew);

router.patch(
  "/:id",
  auth.authenticateToken,
  CrewController.getCrew,
  CrewController.updateCrew
);

router.delete(
  "/:id",
  auth.authenticateToken,
  CrewController.getCrew,
  CrewController.deleteCrew
);

module.exports = router;
