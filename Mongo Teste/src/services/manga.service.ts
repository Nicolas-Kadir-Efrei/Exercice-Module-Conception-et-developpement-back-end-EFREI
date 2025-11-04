import Manga, { IManga, IMangaDocument } from '../models/manga.model';
import { FilterQuery } from 'mongoose';

export class MangaService {
  /**
   * Crée un nouveau manga
   * @param mangaData Les données du manga à créer
   * @returns Le document manga créé
   */
  async create(mangaData: IManga): Promise<IMangaDocument> {
    try {
      const manga = new Manga(mangaData);
      return await manga.save();
    } catch (error) {
      throw new Error(`Erreur lors de la création du manga: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Trouve un manga par son ID
   * @param id L'ID du manga
   * @returns Le document manga ou null si non trouvé
   */
  async findById(id: string): Promise<IMangaDocument | null> {
    try {
      return await Manga.findById(id);
    } catch (error) {
      throw new Error(`Erreur lors de la recherche du manga: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Récupère tous les mangas avec pagination optionnelle
   * @param page Le numéro de page (à partir de 1)
   * @param limit Le nombre d'éléments par page
   * @returns Un tableau de documents manga
   */
  async list(page: number = 1, limit: number = 10): Promise<{ mangas: IMangaDocument[]; total: number; pages: number }> {
    try {
      const skip = (page - 1) * limit;
      const total = await Manga.countDocuments();
      const mangas = await Manga.find().skip(skip).limit(limit);
      
      return {
        mangas,
        total,
        pages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des mangas: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Recherche des mangas par mot-clé et filtres optionnels
   * @param keyword Le mot-clé de recherche
   * @param filters Filtres additionnels
   * @returns Un tableau de documents manga correspondant aux critères de recherche
   */
  async search(keyword: string, filters: Record<string, any> = {}): Promise<IMangaDocument[]> {
    try {
      // Crée la requête de base pour la recherche par mot-clé (insensible à la casse)
      const baseQuery: FilterQuery<IMangaDocument> = {
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      };

      // Ajoute des filtres supplémentaires
      const query = { ...baseQuery };
      
      // Traitement du filtre de genre
      if (filters.genre) {
        query.genre = { $in: [filters.genre] };
      }
      
      // Traitement du filtre de note (ex: note>=7)
      if (filters.rating) {
        const ratingValue = parseFloat(filters.rating);
        if (!isNaN(ratingValue)) {
          query.rating = { $gte: ratingValue };
        }
      }
      
      // Traitement du filtre de statut
      if (filters.status && (['ongoing', 'completed', 'hiatus'] as string[]).indexOf(filters.status) !== -1) {
        query.status = filters.status;
      }

      // Traitement du filtre d'année de sortie
      if (filters.releaseYear) {
        query.releaseYear = parseInt(filters.releaseYear);
      }

      return await Manga.find(query);
    } catch (error) {
      throw new Error(`Erreur lors de la recherche des mangas: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Met à jour un manga par son ID
   * @param id L'ID du manga
   * @param updateData Les données à mettre à jour
   * @returns Le document manga mis à jour ou null si non trouvé
   */
  async update(id: string, updateData: Partial<IManga>): Promise<IMangaDocument | null> {
    try {
      return await Manga.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour du manga: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Supprime un manga par son ID
   * @param id L'ID du manga
   * @returns Vrai si supprimé, faux sinon
   */
  async delete(id: string): Promise<boolean> {
    try {
      const result = await Manga.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      throw new Error(`Erreur lors de la suppression du manga: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
