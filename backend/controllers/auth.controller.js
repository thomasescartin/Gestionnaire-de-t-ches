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

exports.register = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const existing = await utilisateur.findUtilisateurs(email);

    if (existing.length > 0) {
      return res.status(400).json({
        message: "Email déjà existant",
      });
    }

    if (!mot_de_passe) {
      return res.status(400).json({
        message: "Mot de passe requis",
      });
    }

    const hashed = await argon2.hash(mot_de_passe);

    const result = await utilisateur.createUtilisateurs(email, hashed);

    return res.status(201).json({
      message: "Utilisateur créé",
      id: result.insertId,
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    const existing = await utilisateur.findUtilisateurs(email);

    if (!existing || existing.length === 0) {
      return res.status(400).json({ message: "Utilisateur n'existe pas" });
    }

    const user = existing[0];

    if (!user.mot_de_passe) {
      return res.status(500).json({
        message: "Hash password invalide en base",
      });
    }

    if (!mot_de_passe) {
      return res.status(400).json({
        message: "Mot de passe requis",
      });
    }

    const valid = await argon2.verify(user.mot_de_passe, mot_de_passe);

    if (!valid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id_utilisateur,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};
