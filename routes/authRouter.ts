import express from "express";
import { postLogin, getLogin } from "../controllers/authController";
import bodyParser from "body-parser";

const authRouter = express.Router();

// GET Login (Read method)
authRouter.get("/", getLogin);

// Post Login (Create method)
authRouter.post("/", bodyParser.json(), postLogin);

export default authRouter;
