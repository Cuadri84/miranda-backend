import express from "express";
import {
  getRooms,
  getRoom,
  postRoom,
  putRoom,
  deleteRoom,
} from "../controllers/mongo/roomController";

const roomsRouter = express.Router();

// GET rooms (Read method)
roomsRouter.get("/", getRooms);

// GET single room (Read method)
roomsRouter.get("/:id", getRoom);

// POST a new room (Create method)
roomsRouter.post("/", postRoom);

// PUT a room (Update method)
roomsRouter.put("/:id", putRoom);

// DELETE single room (Delete method)
roomsRouter.delete("/:id", deleteRoom);

export default roomsRouter;
