"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaController = void 0;
const manga_service_1 = require("../services/manga.service");
class MangaController {
    constructor() {
        this.mangaService = new manga_service_1.MangaService();
    }
    /**
     * Create a new manga
     * @param req Express request
     * @param res Express response
     */
    createManga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mangaData = req.body;
                const manga = yield this.mangaService.create(mangaData);
                res.status(201).json({
                    success: true,
                    data: manga
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to create manga'
                });
            }
        });
    }
    /**
     * Get a manga by ID
     * @param req Express request
     * @param res Express response
     */
    getMangaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const manga = yield this.mangaService.findById(id);
                if (!manga) {
                    res.status(404).json({
                        success: false,
                        message: 'Manga not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: manga
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to retrieve manga'
                });
            }
        });
    }
    /**
     * Get all mangas with pagination
     * @param req Express request
     * @param res Express response
     */
    getAllMangas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const result = yield this.mangaService.list(page, limit);
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to retrieve mangas'
                });
            }
        });
    }
    /**
     * Search mangas by keyword and filters
     * @param req Express request
     * @param res Express response
     */
    searchMangas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { keyword } = req.query;
                if (!keyword || typeof keyword !== 'string') {
                    res.status(400).json({
                        success: false,
                        message: 'Search keyword is required'
                    });
                    return;
                }
                // Extract filters from query params
                const filters = {};
                // Add genre filter if provided
                if (req.query.genre && typeof req.query.genre === 'string') {
                    filters.genre = req.query.genre;
                }
                // Add rating filter if provided
                if (req.query.rating && typeof req.query.rating === 'string') {
                    filters.rating = req.query.rating;
                }
                // Add status filter if provided
                if (req.query.status && typeof req.query.status === 'string') {
                    filters.status = req.query.status;
                }
                // Add releaseYear filter if provided
                if (req.query.releaseYear && typeof req.query.releaseYear === 'string') {
                    filters.releaseYear = req.query.releaseYear;
                }
                const mangas = yield this.mangaService.search(keyword, filters);
                res.status(200).json({
                    success: true,
                    data: mangas,
                    count: mangas.length
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to search mangas'
                });
            }
        });
    }
    /**
     * Update a manga by ID
     * @param req Express request
     * @param res Express response
     */
    updateManga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = req.body;
                const manga = yield this.mangaService.update(id, updateData);
                if (!manga) {
                    res.status(404).json({
                        success: false,
                        message: 'Manga not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    data: manga
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to update manga'
                });
            }
        });
    }
    /**
     * Delete a manga by ID
     * @param req Express request
     * @param res Express response
     */
    deleteManga(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield this.mangaService.delete(id);
                if (!deleted) {
                    res.status(404).json({
                        success: false,
                        message: 'Manga not found'
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: 'Manga deleted successfully'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Failed to delete manga'
                });
            }
        });
    }
}
exports.MangaController = MangaController;
