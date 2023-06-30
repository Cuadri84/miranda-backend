"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dashboardRouter = express_1.default.Router();
// GET dashboard (Read method)
dashboardRouter.get("/", function (req, res) {
    res.send("Dashboard");
});
exports.default = dashboardRouter;
