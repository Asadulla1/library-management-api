import { Request, Response, Router } from "express";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  registerBook,
  updateBook,
} from "./book.controller";

export const bookRoutes = Router();

// get all method
bookRoutes.get("/", getAllBooks);

// create a book
bookRoutes.post("/", registerBook);

// get a book by Id
bookRoutes.get("/:bookId", getBookById);

// update a book
bookRoutes.put("/:bookId", updateBook);

// delete a book
bookRoutes.delete("/:bookId", deleteBook);
