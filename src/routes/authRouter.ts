import express from "express";
import { postLogin, getLogin } from "../controllers/mongo/loginController";

const authRouter = express.Router();

// GET Login (Read method)
authRouter.get("/", getLogin);

// Post Login (Create method)
authRouter.post("/", postLogin);

export default authRouter;
