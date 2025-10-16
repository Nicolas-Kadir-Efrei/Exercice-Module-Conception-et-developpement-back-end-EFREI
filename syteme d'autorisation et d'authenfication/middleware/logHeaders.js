/**
 * Middleware pour afficher les headers de chaque requête
 */
const logHeaders = (req, res, next) => {
  console.log('Headers de la requête:', req.headers);
  next();
};

module.exports = logHeaders;
