# API Manga - Express TypeScript MongoDB

Une API RESTful pour gérer une collection de mangas, construite avec Express.js, TypeScript et MongoDB, suivant une architecture MVC orientée objet.

## Fonctionnalités

- Architecture MVC complète (Model, View, Controller, Service, Router)
- CRUD pour les mangas
- Recherche par mot-clé sur plusieurs champs (titre, description)
- Filtrage par genre, statut, note, etc.
- Interface utilisateur simple pour tester l'API

## Prérequis

- Node.js (v14+)
- MongoDB (local ou distant)
- npm ou yarn

## Installation

1. Cloner le dépôt :
```bash
git clone <url-du-repo>
cd manga-api
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
   - Créer un fichier `.env` à la racine du projet
   - Ajouter les variables suivantes :
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/manga_db
```

4. Compiler le projet TypeScript :
```bash
npm run build
```

5. Lancer le serveur :
```bash
npm start
```

Pour le développement avec rechargement automatique :
```bash
npm run dev
```

## Structure du projet

```
manga-api/
├── src/
│   ├── config/         # Configuration (base de données)
│   ├── controllers/    # Contrôleurs HTTP
│   ├── models/         # Modèles de données et schémas
│   ├── public/         # Interface utilisateur
│   ├── routes/         # Définition des routes
│   ├── services/       # Logique métier
│   └── index.ts        # Point d'entrée de l'application
├── dist/               # Code compilé
├── .env                # Variables d'environnement
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Mangas

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/mangas` | Liste tous les mangas (avec pagination) |
| GET | `/api/mangas/:id` | Récupère un manga par son ID |
| GET | `/api/mangas/search?keyword=...` | Recherche des mangas par mot-clé |
| POST | `/api/mangas` | Crée un nouveau manga |
| PUT | `/api/mangas/:id` | Met à jour un manga existant |
| DELETE | `/api/mangas/:id` | Supprime un manga |

### Paramètres de recherche

La route `/api/mangas/search` accepte les paramètres suivants :

- `keyword` (obligatoire) : Terme de recherche (titre ou description)
- `genre` : Filtre par genre
- `rating` : Filtre par note minimale
- `status` : Filtre par statut (ongoing, completed, hiatus)
- `releaseYear` : Filtre par année de sortie

### Exemple de requête

#### Créer un manga

```bash
curl -X POST http://localhost:3000/api/mangas \
  -H "Content-Type: application/json" \
  -d '{
    "title": "One Piece",
    "author": "Eiichiro Oda",
    "description": "L'histoire suit les aventures de Monkey D. Luffy, un garçon dont le corps a acquis les propriétés du caoutchouc après avoir mangé un fruit du démon.",
    "genre": ["action", "aventure", "comédie"],
    "volumes": 104,
    "status": "ongoing",
    "releaseYear": 1997,
    "rating": 9.5,
    "coverImage": "https://example.com/one-piece.jpg"
  }'
```

#### Rechercher des mangas

```bash
curl -X GET "http://localhost:3000/api/mangas/search?keyword=aventure&genre=action&rating=8"
```

## Modèle de données

### Manga

| Champ | Type | Description |
|-------|------|-------------|
| title | String | Titre du manga (obligatoire) |
| author | String | Auteur du manga (obligatoire) |
| description | String | Description du manga (obligatoire) |
| genre | [String] | Liste des genres |
| volumes | Number | Nombre de volumes |
| status | String | Statut (ongoing, completed, hiatus) |
| releaseYear | Number | Année de sortie (obligatoire) |
| rating | Number | Note sur 10 |
| coverImage | String | URL de l'image de couverture |
| createdAt | Date | Date de création (automatique) |
| updatedAt | Date | Date de mise à jour (automatique) |

## Interface utilisateur

Une interface utilisateur simple est disponible à l'adresse `http://localhost:3000` pour tester les fonctionnalités de l'API.

## Architecture

Ce projet suit une architecture MVC (Modèle-Vue-Contrôleur) orientée objet :

- **Modèles** : Définissent la structure des données et les interactions avec la base de données
- **Services** : Contiennent la logique métier et les opérations sur les données
- **Contrôleurs** : Gèrent les requêtes HTTP et délèguent aux services
- **Routes** : Définissent les endpoints de l'API
- **Config** : Gère la configuration de l'application et les connexions externes

## Licence

MIT
