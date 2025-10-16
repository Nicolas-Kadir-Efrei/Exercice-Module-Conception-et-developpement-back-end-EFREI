# Système d'Autorisation et d'Authentification

Ce projet implémente un système d'autorisation et d'authentification pour une API REST avec Express.js, suivant les étapes d'un exercice progressif.

## Étapes de l'exercice

### 1. Système d'autorisation simple

- Route publique `/hello` accessible à tous
- Routes protégées `/restricted1` et `/restricted2` accessibles uniquement avec le token "42"

### 2. Middleware de sécurité

- Middleware `logHeaders` pour afficher les headers des requêtes
- Middleware `firewall` pour protéger les routes avec une liste d'URLs non restreintes

### 3. Système de login simple

- Route `/authenticate` pour générer un token aléatoire

### 4. Système de login amélioré

- Vérification des identifiants utilisateur
- Stockage des tokens par utilisateur

### 5. Système d'inscription

- Route `/register` pour créer un nouvel utilisateur
- Hachage des mots de passe avec bcrypt

## Installation

1. Installer les dépendances avec `npm install`
2. Lancer le serveur avec `node server.js`

## Structure du projet

- `server.js` : Point d'entrée de l'application
- `middleware/` : Contient les middlewares
  - `logHeaders.js` : Middleware pour afficher les headers des requêtes
  - `firewall.js` : Middleware de protection des routes (token fixe "42")
  - `advancedFirewall.js` : Middleware avancé (tokens dynamiques)
- `inMemoryUserRepository.js` : Repository pour gérer les utilisateurs

## Comment tester

### 1. Tester la route publique `/hello`

```powershell
Invoke-WebRequest -Uri http://localhost:3000/hello
```

### 2. Tester les routes protégées avec le token fixe "42"

```powershell
Invoke-WebRequest -Uri http://localhost:3000/restricted1 -Headers @{token="42"}
Invoke-WebRequest -Uri http://localhost:3000/restricted2 -Headers @{token="42"}
```

### 3. Tester l'inscription d'un utilisateur

```powershell
Invoke-WebRequest -Uri http://localhost:3000/register -Method POST -ContentType "application/json" -Body '{"email":"user@example.com","password":"password123"}'
```

### 4. Tester l'authentification

```powershell
$response = Invoke-WebRequest -Uri http://localhost:3000/authenticate -Method POST -ContentType "application/json" -Body '{"email":"user@example.com","password":"password123"}'
$token = ($response.Content | ConvertFrom-Json).token
```

### 5. Tester les routes protégées avec le token dynamique

Pour tester avec le système avancé, il faudrait modifier le code pour utiliser `advancedFirewall` au lieu de `firewall`.

## Notes importantes

- Le système actuel utilise le token fixe "42" comme demandé dans la première partie de l'exercice.
- Pour utiliser le système d'authentification avancé, il faudrait remplacer `firewall` par `advancedFirewall` dans `server.js`.

## Améliorations possibles

- Stockage des utilisateurs dans une base de données
- Système de rôles pour différents niveaux d'accès
- Expiration des tokens
- Utilisation de JWT pour les tokens
