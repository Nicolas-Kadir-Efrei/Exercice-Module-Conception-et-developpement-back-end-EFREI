# Introduction à la connexion à une base de données PostgreSQL avec Node.js

Ce projet démontre comment se connecter à une base de données PostgreSQL en utilisant Node.js et la bibliothèque `pg`.

## Fichiers inclus

- `db_utils.js` : Contient les fonctions pour se connecter à la base de données, récupérer des utilisateurs et insérer de nouveaux utilisateurs
- `test_env.js` : Script pour tester les variables d'environnement
- `test_db_connection.js` : Script pour tester la connexion à la base de données

## Utilisation des variables d'environnement

Pour des raisons de sécurité, les identifiants de la base de données sont stockés dans des variables d'environnement:
- `dbuser` : Nom d'utilisateur pour la base de données
- `dbpwd` : Mot de passe pour la base de données

## Comment exécuter les scripts

Dans PowerShell:
```powershell
$env:dbpwd="votre_mot_de_passe"; $env:dbuser="votre_utilisateur"; node votre_script.js
```

## Fonctionnalités

- Connexion à une base de données PostgreSQL
- Récupération des utilisateurs
- Insertion de nouveaux utilisateurs
- Utilisation sécurisée des identifiants via des variables d'environnement
