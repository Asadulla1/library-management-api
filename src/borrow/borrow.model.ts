import { model, Schema, Types } from "mongoose";
import { IBorrow } from "./borrow.interface";
import { Book } from "../book/book.model";

const borrowSchema = new Schema<IBorrow>(
  {
    book: { type: Types.ObjectId, required: true, ref: "book" },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
  const bookId = this.book;
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new Error("Book not Found"));
  } else {
    next();
  }
});

export const borrow = model<IBorrow>("Borrow", borrowSchema);
