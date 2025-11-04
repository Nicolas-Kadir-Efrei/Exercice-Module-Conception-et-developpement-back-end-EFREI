"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manga_controller_1 = require("../controllers/manga.controller");
const router = (0, express_1.Router)();
const mangaController = new manga_controller_1.MangaController();
// Create a new manga
router.post('/', (req, res) => mangaController.createManga(req, res));
// Get all mangas with pagination
router.get('/', (req, res) => mangaController.getAllMangas(req, res));
// Search mangas
router.get('/search', (req, res) => mangaController.searchMangas(req, res));
// Get a manga by ID
router.get('/:id', (req, res) => mangaController.getMangaById(req, res));
// Update a manga
router.put('/:id', (req, res) => mangaController.updateManga(req, res));
// Delete a manga
router.delete('/:id', (req, res) => mangaController.deleteManga(req, res));
exports.default = router;
