const tache = require("../models/tache.model");
const argon2 = require("argon2");
const dotenv = require("dotenv/config");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

exports.authSchema = z.object({
  contenu: z.string(),
});

exports.create = async (req, res) => {
  try {
    const { contenu } = req.body;

    const existing = await tache.findTache(contenu);

    if (existing) {
      return res.status(400).json({ message: "Tache déjà existante" });
    }

    const Tache = await tache.createTache(contenu);

    return res.status(201).json({
      message: "Tache créée.",
      Tache,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

exports.afficherTache = async (req, res) => {
  try {
    const { contenu } = req.body;

    const existing = await utilisateur.findUtilisateurs(contenu);

    if (!existing) {
      return res.status(400).json({ message: "Tache déjà existante" });
    }

    const Tache = await utilisateur.findTache(contenu);

    return res.status(404).json({
      message: "Tache non trouvée",
      Tache,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { contenu } = req.body;

    const existing = await utilisateur.findTache(contenu);

    if (!existing) {
      return res.status(400).json("Tache non trouvée.");
    }

    const Tache = await tache.modifyTache(contenu);

    return res.status(201).json({
      message: "Tache modifiée",
      Tache,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const existing = await tache.findTache(id);

    if (!existing) {
      return res.status(400).json("Tache introuvable.");
    }

    const idU = await tache.deleteTache(id);

    return res.status(201).json({
      message: "Tache supprimée",
      idU,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
