"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
exports.borrowRoutes = (0, express_1.Router)();
exports.borrowRoutes.post("/", borrow_controller_1.registerBorrowRecord);
exports.borrowRoutes.get("/", borrow_controller_1.getBorrowSummary);
