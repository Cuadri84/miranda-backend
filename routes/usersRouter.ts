import express from "express";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from "../controllers/usersController";

const usersRouter = express.Router();

// GET users (Read method)
usersRouter.get("/", getUsers);

// GET single user (Read method)
usersRouter.get("/:id", getUser);

// POST a new user (Create method)
usersRouter.post("/", postUser);

// PUT a user (Update method)
usersRouter.put("/:id", putUser);

// DELETE single user (Delete method)
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
