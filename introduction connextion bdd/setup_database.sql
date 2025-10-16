-- Script pour créer la base de données et la table users
-- À exécuter dans pgAdmin ou psql

-- Créer la base de données
CREATE DATABASE mabase;

-- Se connecter à la base de données
\c mabase;

-- Créer la table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(80),
    name VARCHAR(100),
    password VARCHAR(100)
);

-- Insérer des données de test
INSERT INTO users (email, name, password) VALUES ('email1@test.com', 'User 1', 'password1');
INSERT INTO users (email, name, password) VALUES ('email2@test.com', 'User 2', 'password2');
INSERT INTO users (email, name, password) VALUES ('email3@test.com', 'User 3', 'password3');

-- Vérifier que les données ont été insérées
SELECT * FROM users;
