const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const BasicInfoController = require("../controllers/BasicInfo.Controller");

router.get("/", auth.authenticateToken, BasicInfoController.showAllBasicInfo);

router.post("/", auth.authenticateToken, BasicInfoController.addBasicInfo);

// router.get(
//   "/:id",
//   auth.authenticateToken,
//   AgentController.getShippingAgent,
//   AgentController.getSingleData
// );

// router.post("/", auth.authenticateToken, AgentController.addAgent);

// router.patch(
//   "/:id",
//   auth.authenticateToken,
//   AgentController.getShippingAgent,
//   AgentController.updateAgent
// );

// router.delete(
//   "/:id",
//   auth.authenticateToken,
//   AgentController.getShippingAgent,
//   AgentController.deleteAgent
// );

module.exports = router;
