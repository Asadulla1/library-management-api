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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const book_routes_1 = require("./book/book.routes");
const borrow_routes_1 = require("./borrow/borrow.routes");
const app = (0, express_1.default)();
const port = config_1.default.port;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/books", book_routes_1.bookRoutes);
app.use("/api/borrow", borrow_routes_1.borrowRoutes);
app.listen(port, () => {
    console.log(`Application is listening to the port no ${port}`);
});
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Library Management System",
    });
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.db_connection_string);
            console.log("Mongodb Connected Successfully");
        }
        catch (error) {
            console.log(error.message);
        }
    });
}
bootstrap();
