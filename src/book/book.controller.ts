import { Request, Response } from "express";

import { object, z } from "zod";
import { Book } from "./book.model";
import { handleError } from "../genericErrorHandler";

const BookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum(
    ["FICTION", "NON-FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    { message: "Value is not Supported" }
  ),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
});

const registerBook = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const zodBookData = await BookZodSchema.parseAsync(payload);
    const book = await Book.create(zodBookData);
    res.status(200).json({
      success: true,
      message: "Book has been inserted Successfully",
      data: book,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

// find All Books

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    let { filter, sortBy, sort, limit } = query;
    filter = filter ? filter : "";
    sortBy = sortBy ? sortBy : "";
    sort = sort ? sort : "";
    limit = limit ? limit : "";
    // const sortCondition = { createdAt: "desc" };
    const sortCondition: any = {};
    sortCondition[sortBy as string] = sort;
    const limitNumber = limit ? parseInt(limit as string) : 10;
    let books = [];
    if (filter || sortBy || sort || limit) {
      books = await Book.find({ genre: filter })
        .sort(sortCondition)
        .limit(limitNumber);
    } else {
      books = await Book.find();
    }
    res.status(200).json({
      success: true,
      message: `${books.length} data Found`,
      data: books,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

// Get Book By ID
const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (!book) {
      throw new Error("No book exists");
    }
    res.status(200).json({
      success: true,
      message: "Book found successfully",
      data: book,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateValue = req.body;
    const book = await Book.findByIdAndUpdate(
      bookId,
      { $set: updateValue },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOneAndDelete({ _id: bookId });
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

export { registerBook, getAllBooks, getBookById, updateBook, deleteBook };
