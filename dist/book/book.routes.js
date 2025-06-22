"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
exports.bookRoutes = (0, express_1.Router)();
// get all method
exports.bookRoutes.get("/", book_controller_1.getAllBooks);
// create a book
exports.bookRoutes.post("/", book_controller_1.registerBook);
// get a book by Id
exports.bookRoutes.get("/:bookId", book_controller_1.getBookById);
// update a book
exports.bookRoutes.put("/:bookId", book_controller_1.updateBook);
// delete a book
exports.bookRoutes.delete("/:bookId", book_controller_1.deleteBook);
