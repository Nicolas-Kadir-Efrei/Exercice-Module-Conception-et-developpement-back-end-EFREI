/**
 * Repository pour stocker les utilisateurs en mémoire
 */
const bcrypt = require('bcrypt');

// Nombre de tours pour le hachage bcrypt
const SALT_ROUNDS = 10;

// Tableau d'utilisateurs inscrits avec mots de passe hachés
const registeredUsers = [
  { email: 'user1@example.com', password: '$2b$10$3euPcmQFCiblsZeEu5s7p.9wvEKHOz1AQ5mCc6KGGrPx7jC0zWGka' }, // password1
  { email: 'user2@example.com', password: '$2b$10$QZQRs6GFX9j2S2GIGj0PeOQQpj3K6/Ejn18zJUkNXv1HjCu0R.JI.' }  // password2
];

// Objet pour stocker les utilisateurs authentifiés
const authenticatedUsers = {};

/**
 * Récupère la liste des utilisateurs inscrits
 * @returns {Array} Liste des utilisateurs inscrits
 */
const getRegisteredUsers = () => {
  return registeredUsers;
};

/**
 * Vérifie les identifiants d'un utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {boolean} True si les identifiants sont valides, false sinon
 */
const checkCredentials = async (email, password) => {
  const user = registeredUsers.find(user => user.email === email);
  if (!user) return false;
  
  // Vérification du mot de passe haché
  return await bcrypt.compare(password, user.password);
};

/**
 * Ajoute un nouvel utilisateur inscrit
 * @param {string} email - Email du nouvel utilisateur
 * @param {string} password - Mot de passe du nouvel utilisateur
 * @returns {Promise<boolean>} True si l'utilisateur a été ajouté, false sinon
 */
const newUserRegistered = async (email, password) => {
  // Vérifier si l'utilisateur existe déjà
  if (registeredUsers.some(user => user.email === email)) {
    return false;
  }
  
  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  // Ajouter le nouvel utilisateur avec le mot de passe haché
  registeredUsers.push({ email, password: hashedPassword });
  return true;
};

/**
 * Vérifie si un token est valide
 * @param {string} token - Token à vérifier
 * @returns {boolean} True si le token est valide, false sinon
 */
const isValidToken = (token) => {
  return authenticatedUsers.hasOwnProperty(token);
};

/**
 * Récupère l'utilisateur associé à un token
 * @param {string} token - Token de l'utilisateur
 * @returns {Object|null} Utilisateur associé au token ou null si le token est invalide
 */
const getUserByToken = (token) => {
  return authenticatedUsers[token] || null;
};

module.exports = {
  getRegisteredUsers,
  checkCredentials,
  newUserRegistered,
  isValidToken,
  getUserByToken,
  authenticatedUsers
};
