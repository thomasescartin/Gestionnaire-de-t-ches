const db = require("../config/db");

exports.findUtilisateurs = async (email) => {
  const [rows] = await db.query("SELECT * FROM utilisateurs WHERE email = ?", [
    email,
  ]);

  return rows;
};

exports.createUtilisateurs = async (email, mot_de_passe, id_role = 1) => {
  const [result] = await db.query(
    "INSERT INTO utilisateurs (email, mot_de_passe, id_role) VALUES (?, ?, ?)",
    [email, mot_de_passe, id_role]
  );
  return result;
};

exports.modifyUtilisateurs = async (id_utilisateur, email, mot_de_passe) => {
  const [result] = await db.query(
    "UPDATE utilisateurs SET email = ?, mot_de_passe = ? WHERE id_utilisateur = ?",
    [email, mot_de_passe, id_utilisateur]
  );

  return result;
};

exports.deleteUtilisateur = async (id_utilisateur) => {
  const [result] = await db.query(
    "DELETE FROM utilisateurs WHERE id_utilisateur = ?",
    [id_utilisateur]
  );
  return result;
};
