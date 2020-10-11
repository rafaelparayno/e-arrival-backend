const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../controllers/Auth.Controller");

router.get("/", auth.authenticateToken, AuthController.showUsers);

router.get("/:id", auth.authenticateToken, AuthController.findByID);

router.post("/add", auth.authenticateToken, AuthController.addUser);

router.patch(
  "/:id",
  auth.authenticateToken,
  AuthController.getUser,
  AuthController.updateUser
);

router.delete(
  "/:id",
  auth.authenticateToken,
  AuthController.getUser,
  AuthController.deleteUser
);

router.post("/login", AuthController.login);

router.post("/token", auth.verifyRefreshToken, AuthController.refreshToken);

router.delete("/logout", auth.verifyRefreshToken, AuthController.logout);

module.exports = router;
