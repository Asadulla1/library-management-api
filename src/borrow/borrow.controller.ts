import { Request, Response } from "express";
import { borrow } from "./borrow.model";
import { Book } from "../book/book.model";
import { handleError } from "../genericErrorHandler";

const registerBorrowRecord = async (req: Request, res: Response) => {
  try {
    const payLoad = req.body;
    const borrowRecord = await borrow.create(payLoad);
    const book = await Book.findById(payLoad.book);
    if (book) {
      book.copies -= payLoad.quantity;
      await book.save();
      await Book.updateAvailabilityStaticMethod(payLoad.book);
    }
    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

const getBorrowSummary = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $group: {
          _id: "$bookDetails.title",
          isbn: { $first: "$bookDetails.isbn" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$_id",
            isbn: "$isbn",
          },
          totalQuantity: 1,
        },
      },
    ];

    const result = await borrow.aggregate(pipeline);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    const errorResponse = handleError(error);
    res.status(400).json({
      errorResponse,
    });
  }
};

export { registerBorrowRecord, getBorrowSummary };
