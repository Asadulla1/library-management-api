import { Schema } from "mongoose";

export interface IBorrow {
  book: Schema.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
