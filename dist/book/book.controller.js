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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.registerBook = void 0;
const zod_1 = require("zod");
const book_model_1 = require("./book.model");
const genericErrorHandler_1 = require("../genericErrorHandler");
const BookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum(["FICTION", "NON-FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], { message: "Value is not Supported" }),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean(),
});
const registerBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const zodBookData = yield BookZodSchema.parseAsync(payload);
        const book = yield book_model_1.Book.create(zodBookData);
        res.status(200).json({
            success: true,
            message: "Book has been inserted Successfully",
            data: book,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.registerBook = registerBook;
// find All Books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        let { filter, sortBy, sort, limit } = query;
        filter = filter ? filter : "";
        sortBy = sortBy ? sortBy : "";
        sort = sort ? sort : "";
        limit = limit ? limit : "";
        // const sortCondition = { createdAt: "desc" };
        const sortCondition = {};
        sortCondition[sortBy] = sort;
        const limitNumber = limit ? parseInt(limit) : 10;
        let books = [];
        if (filter || sortBy || sort || limit) {
            books = yield book_model_1.Book.find({ genre: filter })
                .sort(sortCondition)
                .limit(limitNumber);
        }
        else {
            books = yield book_model_1.Book.find();
        }
        res.status(200).json({
            success: true,
            message: `${books.length} data Found`,
            data: books,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.getAllBooks = getAllBooks;
// Get Book By ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            throw new Error("No book exists");
        }
        res.status(200).json({
            success: true,
            message: "Book found successfully",
            data: book,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateValue = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, { $set: updateValue }, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.deleteBook = deleteBook;
