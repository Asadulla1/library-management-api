import { Router } from "express";
import { getBorrowSummary, registerBorrowRecord } from "./borrow.controller";

export const borrowRoutes = Router();

borrowRoutes.post("/", registerBorrowRecord);

borrowRoutes.get("/", getBorrowSummary);
