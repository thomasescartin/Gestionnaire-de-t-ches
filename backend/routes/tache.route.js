const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tache.controller");

router.post("/createTache", tacheController.create);
router.post("/getTache", tacheController.afficherTache);
router.patch("/modifyTache", tacheController.update);
router.delete("/deleteTache", tacheController.delete);

module.exports = router;
