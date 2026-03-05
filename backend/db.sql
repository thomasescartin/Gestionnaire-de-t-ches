CREATE DATABASE GDT;
USE GDT;
CREATE TABLE role (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    mon_role VARCHAR(50) NOT NULL UNIQUE,
);

INSERT INTO role (mon_role) VALUES
('utilisateur'),
('admin');

CREATE TABLE utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    id_role INT NOT NULL,
    FOREIGN KEY(id_role) REFERENCES role(id_role)
);


CREATE TABLE taches (
    id_tache INT AUTO_INCREMENT PRIMARY KEY,
    contenu VARCHAR(255) NOT NULL,
    id_utilisateur INT NOT NULL,
    FOREIGN KEY (id_utilisateur)
    REFERENCES utilisateurs (id_utilisateur)
    ON DELETE CASCADE
);