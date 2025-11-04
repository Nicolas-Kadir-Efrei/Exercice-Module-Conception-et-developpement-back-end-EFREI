import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import './config/database'; // Initialisation de la connexion à la base de données
import mangaRoutes from './routes/manga.routes';

// Chargement des variables d'environnement
dotenv.config();

// Création de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques depuis le répertoire public
app.use(express.static(path.join(__dirname, 'public')));

// Routes API
app.use('/api/mangas', mangaRoutes);

// Servir le frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
