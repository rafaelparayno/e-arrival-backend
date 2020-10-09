const express = require("express");
const router = express.Router();
const CrewController = require("../controllers/Crew.Controller");

router.get("/", CrewController.getAllCrew);

router.post("/", CrewController.addCrew);

router.patch("/:id", CrewController.getCrew, CrewController.updateCrew);

router.delete("/:id", CrewController.getCrew, CrewController.deleteCrew);

module.exports = router;
