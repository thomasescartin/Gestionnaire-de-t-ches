const utilisateur = require("../models/utilisateur.model");
const argon2 = require("argon2");
const dotenv = require("dotenv/config");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

exports.authSchema = z.object({
  email: z
    .string()
    .min(8, "L'email doit contenir au moins 8 caractères")
    .email("Format d'email invalide")
    .regex(/\.(fr|com|org|net|io)$/, "Extension d'email invalide"),

  mot_de_passe: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre."),
});

exports.update = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const existing = await utilisateur.findUtilisateurs(email, mot_de_passe);

    if (!existing) {
      return res.status(400).json("Utilisateur introuvable.");
    }

    const hashed = await argon2.hash(mot_de_passe);

    const id = await utilisateur.modifyUtilisateurs(email, hashed);

    return res.status(201).json({
      message: "Email ou mot de passe modifié",
      id,
      email,
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

    const existing = await utilisateur.findUtilisateurs(id);

    if (!existing) {
      return res.status(400).json("Utilisateur introuvable.");
    }

    const idU = await utilisateur.deleteUtilisateur(id);

    return res.status(201).json({
      message: "Utilisateur supprimé",
      idU,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
