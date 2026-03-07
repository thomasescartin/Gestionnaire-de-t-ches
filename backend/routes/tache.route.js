const express = require("express");
const router = express.Router();
const tacheController = require("../controllers/tache.controller");

router.post("/tache", tacheController.create);
router.post("/tache", tacheController.afficherTache);
router.patch("/tache", tacheController.update);
router.delete("/tache", tacheController.delete);
module.exports = router;
