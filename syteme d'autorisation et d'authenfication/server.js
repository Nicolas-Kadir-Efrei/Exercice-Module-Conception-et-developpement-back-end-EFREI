const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

// Import des middlewares
const logHeaders = require('./middleware/logHeaders');
const firewall = require('./middleware/firewall');

// Import du repository utilisateur
const userRepo = require('./inMemoryUserRepository');

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour logger les headers
app.use(logHeaders);

// Middleware de firewall pour protéger les routes
app.use(firewall);

// Route simple /hello
app.get('/hello', (req, res) => {
  res.send('<h1>hello</h1>');
});

// Route /restricted1 avec vérification de token (gérée par le middleware firewall)
app.get('/restricted1', (req, res) => {
  res.json({ message: 'topsecret' });
});

// Route /restricted2 avec vérification de token (gérée par le middleware firewall)
app.get('/restricted2', (req, res) => {
  res.send('<h1>Admin space</h1>');
});

// Route d'authentification
app.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérification des identifiants
    const isValid = await userRepo.checkCredentials(email, password);
    
    if (!isValid) {
      return res.status(403).json({ error: 'Identifiants invalides' });
    }
    
    // Génération d'un token
    const token = uuidv4();
    
    // Stockage du token
    userRepo.authenticatedUsers[token] = { email };
    
    // Envoi du token au client
    res.json({ token });
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Route d'inscription
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Vérification des données
  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }
  
  try {
    // Ajout de l'utilisateur
    const registered = await userRepo.newUserRegistered(email, password);
    
    if (!registered) {
      return res.status(409).json({ error: 'Utilisateur déjà existant' });
    }
    
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
