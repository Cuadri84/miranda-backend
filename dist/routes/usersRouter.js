"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const usersRouter = express_1.default.Router();
// GET users (Read method)
usersRouter.get("/", usersController_1.getUsers);
// GET single user (Read method)
usersRouter.get("/:id", usersController_1.getUser);
// POST a new user (Create method)
usersRouter.post("/", usersController_1.postUser);
// PUT a user (Update method)
usersRouter.put("/:id", usersController_1.putUser);
// DELETE single user (Delete method)
usersRouter.delete("/:id", usersController_1.deleteUser);
exports.default = usersRouter;
