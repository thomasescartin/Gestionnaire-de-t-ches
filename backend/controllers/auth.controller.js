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
    const { email, password } = req.body;

    const existing = await utilisateur.findUtilisateurs(email);

    if (existing) {
      return res.status(400).json({ message: "Email déjà existant" });
    }

    const hashed = await argon2.hash(password);

    const id = await utilisateur.createUtilisateurs(email, hashed);

    return res.status(201).json({
      message: "Utilisateur créé",
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await utilisateur.findUtilisateurs(email);

    if (!existing) {
      return res.status(400).json({ message: "Utilisateur n'existe pas" });
    }

    const valid = await argon2.verify(existing.password, password);

    if (!valid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: existing.id, email: existing.email },
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
