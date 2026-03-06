const jwt = require("jsonwebtoken");
require("dotenv/config.js");

exports.authMiddleware = (res, req, next) => {
  const token = req.headers.autorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Accès refusé" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide" });
  }
};
