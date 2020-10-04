require("dotenv").config();

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const AuthController = require("../controllers/Auth.Controller");

router.get("/", auth.authenticateToken, AuthController.showUsers);

router.post("/add", auth.authenticateToken, AuthController.addUser);

router.post("/login", AuthController.login);

router.post("/token", auth.verifyRefreshToken, AuthController.refreshToken);

router.delete("/logout", auth.verifyRefreshToken, AuthController.logout);

module.exports = router;
