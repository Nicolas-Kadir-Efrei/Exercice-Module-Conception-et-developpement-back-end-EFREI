import mongoose, { Document, Schema } from 'mongoose';

// Interface TypeScript pour Manga
export interface IManga {
  title: string;        // Titre
  author: string;       // Auteur
  description: string;  // Description
  genre: string[];      // Genres
  volumes: number;      // Nombre de volumes
  status: 'ongoing' | 'completed' | 'hiatus';  // Statut: en cours, terminé, en pause
  releaseYear: number;  // Année de sortie
  rating: number;       // Note
  coverImage?: string;  // Image de couverture
  createdAt?: Date;     // Date de création
  updatedAt?: Date;     // Date de mise à jour
}

// Interface pour le Document Manga (Document Mongoose avec les propriétés IManga)
export interface IMangaDocument extends IManga, Document {}

// Schéma Mongoose
const MangaSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
      default: [],
    },
    volumes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'hiatus'],
      default: 'ongoing',
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    coverImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Création et export du modèle
export default mongoose.model<IMangaDocument>('Manga', MangaSchema);
