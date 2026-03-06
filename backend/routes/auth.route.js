const express = require("express");
const router = express.Router();
const registerController = require("../controllers/auth.controller");
const loginController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post(
  "/register",
  authMiddleware.authMiddleware, // middleware d'autentification
  registerController.register
);
router.post("login", authMiddleware.authMiddleware, loginController.login);

module.exports = router;
