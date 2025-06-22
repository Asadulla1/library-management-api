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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("../borrow/borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: [true, "Book Title is Required"] },
    author: { type: String, required: [true, "Author Name is Required"] },
    genre: {
        type: String,
        required: [true, "Genre is Required"],
        enum: {
            values: [
                "FICTION",
                "NON-FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "{VALUE} is not Supported",
        },
    },
    isbn: {
        type: String,
        required: [true, "ISBN Number is Required"],
        unique: true,
    },
    description: String,
    copies: {
        type: Number,
        required: [true, "Copies Number is Required"],
        min: [0, "Copies Number Should be at least 0"],
    },
    available: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.static("updateAvailabilityStaticMethod", function updateAvailabilityStaticMethod(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        book.available = book.copies > 0;
        yield book.save();
        return book;
    });
});
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const boookId = doc._id;
        yield borrow_model_1.borrow.deleteMany({ book: boookId });
        next();
    });
});
exports.Book = (0, mongoose_1.model)("book", bookSchema);
