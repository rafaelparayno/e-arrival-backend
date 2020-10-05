const express = require("express");
const router = express.Router();
const AgentController = require("../controllers/Agent.Controller");
const auth = require("../middleware/auth");

router.get("/", auth.authenticateToken, AgentController.showAllAgents);

router.post("/", auth.authenticateToken, AgentController.addAgent);

router.patch(
  "/:id",
  auth.authenticateToken,
  AgentController.getShippingAgent,
  AgentController.updateAgent
);

module.exports = router;
