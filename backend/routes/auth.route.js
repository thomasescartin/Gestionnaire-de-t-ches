const express = require("express");
const router = express.Router();
const registerController = require("../controllers/auth.controller");
const loginController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", registerController.register);
router.post("/login", loginController.login);

module.exports = router;
