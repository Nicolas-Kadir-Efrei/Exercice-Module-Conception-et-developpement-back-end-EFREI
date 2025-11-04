import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manga_db';

export class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private async connect(): Promise<void> {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connecté à MongoDB avec succès');
    } catch (error) {
      console.error('Échec de la connexion à MongoDB:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Déconnecté de MongoDB');
    } catch (error) {
      console.error('Erreur lors de la déconnexion de MongoDB:', error);
    }
  }
}

export default Database.getInstance();
