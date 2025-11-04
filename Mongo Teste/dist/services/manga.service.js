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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaService = void 0;
const manga_model_1 = __importDefault(require("../models/manga.model"));
class MangaService {
    /**
     * Create a new manga
     * @param mangaData The manga data to create
     * @returns The created manga document
     */
    create(mangaData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const manga = new manga_model_1.default(mangaData);
                return yield manga.save();
            }
            catch (error) {
                throw new Error(`Error creating manga: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Find a manga by its ID
     * @param id The manga ID
     * @returns The manga document or null if not found
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield manga_model_1.default.findById(id);
            }
            catch (error) {
                throw new Error(`Error finding manga: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Get all mangas with optional pagination
     * @param page The page number (starting from 1)
     * @param limit The number of items per page
     * @returns An array of manga documents
     */
    list() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            try {
                const skip = (page - 1) * limit;
                const total = yield manga_model_1.default.countDocuments();
                const mangas = yield manga_model_1.default.find().skip(skip).limit(limit);
                return {
                    mangas,
                    total,
                    pages: Math.ceil(total / limit)
                };
            }
            catch (error) {
                throw new Error(`Error listing mangas: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Search mangas by keyword and optional filters
     * @param keyword The search keyword
     * @param filters Additional filters
     * @returns An array of manga documents matching the search criteria
     */
    search(keyword_1) {
        return __awaiter(this, arguments, void 0, function* (keyword, filters = {}) {
            try {
                // Create the base query for keyword search (case insensitive)
                const baseQuery = {
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { description: { $regex: keyword, $options: 'i' } }
                    ]
                };
                // Add additional filters
                const query = Object.assign({}, baseQuery);
                // Process genre filter
                if (filters.genre) {
                    query.genre = { $in: [filters.genre] };
                }
                // Process rating filter (e.g., rating>=7)
                if (filters.rating) {
                    const ratingValue = parseFloat(filters.rating);
                    if (!isNaN(ratingValue)) {
                        query.rating = { $gte: ratingValue };
                    }
                }
                // Process status filter
                if (filters.status && ['ongoing', 'completed', 'hiatus'].indexOf(filters.status) !== -1) {
                    query.status = filters.status;
                }
                // Process release year filter
                if (filters.releaseYear) {
                    query.releaseYear = parseInt(filters.releaseYear);
                }
                return yield manga_model_1.default.find(query);
            }
            catch (error) {
                throw new Error(`Error searching mangas: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Update a manga by its ID
     * @param id The manga ID
     * @param updateData The data to update
     * @returns The updated manga document or null if not found
     */
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield manga_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            }
            catch (error) {
                throw new Error(`Error updating manga: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
    /**
     * Delete a manga by its ID
     * @param id The manga ID
     * @returns True if deleted, false otherwise
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield manga_model_1.default.findByIdAndDelete(id);
                return result !== null;
            }
            catch (error) {
                throw new Error(`Error deleting manga: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.MangaService = MangaService;
