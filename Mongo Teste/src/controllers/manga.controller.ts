import { Request, Response } from 'express';
import { MangaService } from '../services/manga.service';
import { IManga } from '../models/manga.model';

export class MangaController {
  private mangaService: MangaService;

  constructor() {
    this.mangaService = new MangaService();
  }

  /**
   * Crée un nouveau manga
   * @param req Requête Express
   * @param res Réponse Express
   */
  async createManga(req: Request, res: Response): Promise<void> {
    try {
      const mangaData: IManga = req.body;
      const manga = await this.mangaService.create(mangaData);
      res.status(201).json({
        success: true,
        data: manga
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de créer le manga'
      });
    }
  }

  /**
   * Récupère un manga par son ID
   * @param req Requête Express
   * @param res Réponse Express
   */
  async getMangaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const manga = await this.mangaService.findById(id);
      
      if (!manga) {
        res.status(404).json({
          success: false,
          message: 'Manga non trouvé'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: manga
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de récupérer le manga'
      });
    }
  }

  /**
   * Récupère tous les mangas avec pagination
   * @param req Requête Express
   * @param res Réponse Express
   */
  async getAllMangas(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.mangaService.list(page, limit);
      
      res.status(200).json({
        success: true,
        data: result.mangas,
        pagination: {
          total: result.total,
          page,
          pages: result.pages,
          limit
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de récupérer les mangas'
      });
    }
  }

  /**
   * Recherche des mangas par mot-clé et filtres
   * @param req Requête Express
   * @param res Réponse Express
   */
  async searchMangas(req: Request, res: Response): Promise<void> {
    try {
      const { keyword } = req.query;
      
      if (!keyword || typeof keyword !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Un mot-clé de recherche est requis'
        });
        return;
      }
      
      // Extraction des filtres depuis les paramètres de requête
      const filters: Record<string, any> = {};
      
      // Ajout du filtre de genre si fourni
      if (req.query.genre && typeof req.query.genre === 'string') {
        filters.genre = req.query.genre;
      }
      
      // Ajout du filtre de note si fourni
      if (req.query.rating && typeof req.query.rating === 'string') {
        filters.rating = req.query.rating;
      }
      
      // Ajout du filtre de statut si fourni
      if (req.query.status && typeof req.query.status === 'string') {
        filters.status = req.query.status;
      }
      
      // Ajout du filtre d'année de sortie si fourni
      if (req.query.releaseYear && typeof req.query.releaseYear === 'string') {
        filters.releaseYear = req.query.releaseYear;
      }
      
      const mangas = await this.mangaService.search(keyword, filters);
      
      res.status(200).json({
        success: true,
        data: mangas,
        count: mangas.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de rechercher des mangas'
      });
    }
  }

  /**
   * Met à jour un manga par son ID
   * @param req Requête Express
   * @param res Réponse Express
   */
  async updateManga(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: Partial<IManga> = req.body;
      
      const manga = await this.mangaService.update(id, updateData);
      
      if (!manga) {
        res.status(404).json({
          success: false,
          message: 'Manga non trouvé'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        data: manga
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de mettre à jour le manga'
      });
    }
  }

  /**
   * Supprime un manga par son ID
   * @param req Requête Express
   * @param res Réponse Express
   */
  async deleteManga(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.mangaService.delete(id);
      
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Manga non trouvé'
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Manga supprimé avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Impossible de supprimer le manga'
      });
    }
  }
}
