const tache = require("../models/tache.model");
const argon2 = require("argon2");
const dotenv = require("dotenv/config");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

exports.authSchema = z.object({
  contenu: z.string(),
});
