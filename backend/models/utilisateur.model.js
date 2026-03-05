const db = require("../config/db");

exports.findUtilisateurs = async (email, mot_de_passe) => {
  const [result] = await db.query(
    "SELECT * FROM utilisateurs WHERE email = ? AND mot_de_passe = ?",
    [email, mot_de_passe]
  );
  return [result][0];
};

exports.createUtilisateurs = async (email, mot_de_passe) => {
  const [result] = await db.query(
    "INSERT INTO utilisateurs (email, mot_de_passe) VALUES (?, ?)",
    [email, mot_de_passe]
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
    "DELETE FROM utilisateur WHERE id_utilisateur = ?",
    [id_utilisateur]
  );
  return result;
};
