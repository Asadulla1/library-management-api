import express, { Request, Response } from "express";
import mongoose from "mongoose";
import config from "./config";
import cors from "cors";
import { bookRoutes } from "./book/book.routes";
import { borrowRoutes } from "./borrow/borrow.routes";
const app = express();
const port = config.port;
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Library Management System",
  });
});
async function bootstrap() {
  try {
    await mongoose.connect(config.db_connection_string!);
    console.log("Mongodb Connected Successfully");
    app.listen(port, () => {
      console.log(`Application is listening to the port no ${port}`);
    });
  } catch (error) {
    console.log((error as Error).message);
  }
}

bootstrap();
