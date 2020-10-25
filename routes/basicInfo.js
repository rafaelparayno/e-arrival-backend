const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const BasicInfoController = require("../controllers/BasicInfo.Controller");

router.get("/", auth.authenticateToken, BasicInfoController.showAllBasicInfo);

router.post("/", auth.authenticateToken, BasicInfoController.addBasicInfo);

router.delete(
  "/:id",
  auth.authenticateToken,
  BasicInfoController.getBasicDetails,
  BasicInfoController.deleteBasicDetails
);

module.exports = router;
