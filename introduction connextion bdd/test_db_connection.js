const { Client } = require('pg');

// Afficher les variables d'environnement utilisées
console.log('Utilisation des identifiants suivants:');
console.log('- Utilisateur:', process.env.dbuser || 'postgres (valeur par défaut)');
console.log('- Mot de passe:', process.env.dbpwd ? '******** (depuis variable env)' : 'root (valeur par défaut)');

// Créer une connexion avec les variables d'environnement
const client = new Client({
  host: 'localhost',
  database: 'mabase',
  user: process.env.dbuser || 'postgres',
  password: process.env.dbpwd || 'root',
  port: 5432,
});

// Tester la connexion
async function testConnection() {
  try {
    await client.connect();
    console.log('Connexion réussie à la base de données!');
    
    const res = await client.query('SELECT NOW()');
    console.log('Heure du serveur PostgreSQL:', res.rows[0].now);
    
    await client.end();
    console.log('Connexion fermée.');
  } catch (err) {
    console.error('Erreur de connexion:', err);
  }
}

testConnection();
