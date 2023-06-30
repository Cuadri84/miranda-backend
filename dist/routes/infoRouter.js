"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// GET info (Read method)
const infoRouter = express_1.default.Router();
infoRouter.get("/", function (req, res) {
    res.send({
        description: "This is a node/express app with diferent routes and Rest method",
        routes: ["login", "dashboard", "bookings", "rooms", "users", "info"],
    });
});
exports.default = infoRouter;
