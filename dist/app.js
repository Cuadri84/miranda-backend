"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
//Router imports
const auth_1 = require("./middleware/auth");
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const bookingsRouter_1 = __importDefault(require("./routes/bookingsRouter"));
const contactRouter_1 = __importDefault(require("./routes/contactRouter"));
const dashboardRouter_1 = __importDefault(require("./routes/dashboardRouter"));
const infoRouter_1 = __importDefault(require("./routes/infoRouter"));
const roomsRouter_1 = __importDefault(require("./routes/roomsRouter"));
const usersRouter_1 = __importDefault(require("./routes/usersRouter"));
exports.app = (0, express_1.default)();
// Middleware para analizar el cuerpo de la solicitud como JSON
exports.app.use(express_1.default.json());
//public routes
exports.app.use("/login", authRouter_1.default);
exports.app.use("/info", infoRouter_1.default);
//private routes
exports.app.use("/", auth_1.verifyToken, dashboardRouter_1.default);
exports.app.use("/bookings", auth_1.verifyToken, bookingsRouter_1.default);
exports.app.use("/rooms", auth_1.verifyToken, roomsRouter_1.default);
exports.app.use("/users", auth_1.verifyToken, usersRouter_1.default);
exports.app.use("/contacts", auth_1.verifyToken, contactRouter_1.default);
exports.default = exports.app;
