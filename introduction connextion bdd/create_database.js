const { Client } = require('pg');

// Connexion à la base de données postgres (base par défaut)
const client = new Client({
  host: 'localhost',
  database: 'postgres', // Base par défaut
  user: process.env.dbuser || 'postgres',
  password: process.env.dbpwd || 'admin123',
  port: 5432,
});

async function createDatabase() {
  try {
    await client.connect();
    console.log('Connexion réussie à la base de données postgres!');
    
    // Vérifier si la base de données mabase existe déjà
    const checkDbResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM pg_database WHERE datname = 'mabase'
      );
    `);
    
    const dbExists = checkDbResult.rows[0].exists;
    
    if (dbExists) {
      console.log('La base de données "mabase" existe déjà.');
    } else {
      // Créer la base de données mabase
      await client.query('CREATE DATABASE mabase');
      console.log('Base de données "mabase" créée avec succès!');
    }
    
    await client.end();
    console.log('Connexion fermée.');
    
    // Si la base de données a été créée, on se connecte à mabase pour créer la table
    if (!dbExists) {
      await createTable();
    }
    
  } catch (err) {
    console.error('Erreur:', err);
  }
}

async function createTable() {
  const mabaseClient = new Client({
    host: 'localhost',
    database: 'mabase',
    user: process.env.dbuser || 'postgres',
    password: process.env.dbpwd || 'admin123',
    port: 5432,
  });
  
  try {
    await mabaseClient.connect();
    console.log('Connexion réussie à la base de données mabase!');
    
    // Vérifier si la table users existe déjà
    const checkTableResult = await mabaseClient.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      );
    `);
    
    const tableExists = checkTableResult.rows[0].exists;
    
    if (tableExists) {
      console.log('La table "users" existe déjà.');
    } else {
      // Créer la table users
      await mabaseClient.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(80),
          name VARCHAR(100),
          password VARCHAR(100)
        );
      `);
      console.log('Table "users" créée avec succès!');
      
      // Insérer des données de test
      await mabaseClient.query(`
        INSERT INTO users (email, name, password) VALUES 
        ('email1@test.com', 'User 1', 'password1'),
        ('email2@test.com', 'User 2', 'password2'),
        ('email3@test.com', 'User 3', 'password3');
      `);
      console.log('Données insérées avec succès!');
    }
    
    // Afficher les utilisateurs
    const result = await mabaseClient.query('SELECT * FROM users');
    console.log('Utilisateurs dans la base de données:');
    console.table(result.rows);
    
    await mabaseClient.end();
    console.log('Connexion fermée.');
    
  } catch (err) {
    console.error('Erreur lors de la création de la table:', err);
  }
}

createDatabase();
