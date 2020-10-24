const express = require("express");
const router = express.Router();
const NewCrewController = require("../controllers/NewCrew.Controller");
// const CrewController = require("../controllers/Crew.Controller");
const auth = require("../middleware/auth");

router.get("/", NewCrewController.getAllCrew);

router.post("/", NewCrewController.addCrew);

// router.post("/vessel", auth.authenticateToken, CrewController.getVesselCrew);

// router.patch(
//   "/:id",
//   auth.authenticateToken,
//   CrewController.getCrew,
//   CrewController.updateCrew
// );

// router.delete(
//   "/:id",
//   auth.authenticateToken,
//   CrewController.getCrew,
//   CrewController.deleteCrew
// );

module.exports = router;
