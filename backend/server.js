require("dotenv/config");
const express = require("express");
const cors = require("cors");

const authRoutes = require("../backend/routes/auth.route");
const profileRoutes = require("../backend/routes/profile.route");
const tacheRoute = require("../backend/routes/tache.route");

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/getTache", tacheRoute);
app.use("/api/deleteTache", tacheRoute);

app.listen(PORT, () => {
  console.log(`Serveur tourne sur http://localhost:${PORT}`);
});
