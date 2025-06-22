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
exports.getBorrowSummary = exports.registerBorrowRecord = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const genericErrorHandler_1 = require("../genericErrorHandler");
const registerBorrowRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payLoad = req.body;
        const borrowRecord = yield borrow_model_1.borrow.create(payLoad);
        const book = yield book_model_1.Book.findById(payLoad.book);
        if (book) {
            book.copies -= payLoad.quantity;
            yield book.save();
            yield book_model_1.Book.updateAvailabilityStaticMethod(payLoad.book);
        }
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.registerBorrowRecord = registerBorrowRecord;
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield borrow_model_1.borrow.aggregate(pipeline);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        const errorResponse = (0, genericErrorHandler_1.handleError)(error);
        res.status(400).json({
            errorResponse,
        });
    }
});
exports.getBorrowSummary = getBorrowSummary;
