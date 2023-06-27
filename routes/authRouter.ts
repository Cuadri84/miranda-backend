import express from "express";
import { postLogin } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/", postLogin);

export default authRouter;
