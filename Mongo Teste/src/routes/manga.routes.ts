import { Router, Request, Response } from 'express';
import { MangaController } from '../controllers/manga.controller';

const router = Router();
const mangaController = new MangaController();

// Créer un nouveau manga
router.post('/', (req: Request, res: Response) => mangaController.createManga(req, res));

// Récupérer tous les mangas avec pagination
router.get('/', (req: Request, res: Response) => mangaController.getAllMangas(req, res));

// Rechercher des mangas
router.get('/search', (req: Request, res: Response) => mangaController.searchMangas(req, res));

// Récupérer un manga par son ID
router.get('/:id', (req: Request, res: Response) => mangaController.getMangaById(req, res));

// Mettre à jour un manga
router.put('/:id', (req: Request, res: Response) => mangaController.updateManga(req, res));

// Supprimer un manga
router.delete('/:id', (req: Request, res: Response) => mangaController.deleteManga(req, res));

export default router;
