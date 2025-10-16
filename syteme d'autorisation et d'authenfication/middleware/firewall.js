/**
 * Middleware de sécurité pour protéger les routes
 */
const userRepo = require('../inMemoryUserRepository');

const firewall = (req, res, next) => {
  // Liste des URLs non restreintes
  const unrestrictedUrls = ['/hello', '/authenticate', '/register'];
  
  // Récupération de l'URL demandée
  const requestedUrl = req.path;
  
  // Si l'URL n'est pas restreinte, on passe au middleware suivant
  if (unrestrictedUrls.includes(requestedUrl)) {
    return next();
  }
  
  // Vérification du token dans le header authorization
  const token = req.headers.token;
  
  // Vérification du token avec le système d'authentification
  if (!token || !userRepo.isValidToken(token)) {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  
  // Ajout des informations de l'utilisateur à la requête
  req.user = userRepo.getUserByToken(token);
  
  // Si le token est valide, on passe au middleware suivant
  next();
};

module.exports = firewall;
