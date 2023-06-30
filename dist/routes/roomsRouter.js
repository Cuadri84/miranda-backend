"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsController_1 = require("../controllers/roomsController");
const roomsRouter = express_1.default.Router();
// GET rooms (Read method)
roomsRouter.get("/", roomsController_1.getRooms);
// GET single room (Read method)
roomsRouter.get("/:id", roomsController_1.getRoom);
// POST a new room (Create method)
roomsRouter.post("/", roomsController_1.postRoom);
// PUT a room (Update method)
roomsRouter.put("/:id", roomsController_1.putRoom);
// DELETE single room (Delete method)
roomsRouter.delete("/:id", roomsController_1.deleteRoom);
exports.default = roomsRouter;
