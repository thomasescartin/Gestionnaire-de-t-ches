const db = require("../config/db");

exports.findTache = async (contenu) => {
  const [result] = await db.query("SELECT * FROM taches WHERE contenu = ?", [
    contenu,
  ]);
  return [result][0];
};

exports.createTache = async (contenu, id_utilisateur) => {
  const [result] = await db.query(
    "INSERT INTO taches (contenu, id_utilisateur) VALUES (?, ?)",
    [contenu, id_utilisateur]
  );
  return result;
};

exports.modifyTache = async (id_tache, contenu) => {
  const [result] = await db.query(
    "UPDATE utilisateurs SET contenu = ? WHERE id_tache = ?",
    [id_tache, contenu]
  );

  return result;
};

exports.deleteTache = async (id_tache) => {
  const [result] = await db.query("DELETE FROM taches WHERE id_tache = ?", [
    id_tache,
  ]);
  return result;
};
