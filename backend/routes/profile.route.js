const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");

router.patch("/profile", profileController.update);
router.delete("/profile", profileController.delete);

module.exports = router;
