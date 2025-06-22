import { model, Schema } from "mongoose";
import { IBook, updateAvailability } from "./book.interface";
import { borrow } from "../borrow/borrow.model";

const bookSchema = new Schema<IBook, updateAvailability>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.static(
  "updateAvailabilityStaticMethod",
  async function updateAvailabilityStaticMethod(bookId: string) {
    const book = await this.findById(bookId);
    if (!book) {
      throw new Error("Book not found");
    }
    book.available = book.copies > 0;
    await book.save();

    return book;
  }
);
bookSchema.post("findOneAndDelete", async function (doc, next) {
  const boookId = doc._id;
  await borrow.deleteMany({ book: boookId });
  next();
});

export const Book = model<IBook, updateAvailability>("book", bookSchema);
