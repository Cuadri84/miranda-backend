import express from "express";

const usersRouter = express.Router();

// GET rooms (Read method)
usersRouter.get("/", getRooms);

// GET single room (Read method)
usersRouter.get("/:roomId", getRoom);

// POST a new room (Create method)
usersRouter.post("/newRoom", postRoom);

// PUT a room (Update method)
usersRouter.put("/editRoom/:roomId", putRoom);

// DELETE single room (Delete method)
usersRouter.delete("/:roomId", deleteRoom);

export default usersRouter;
