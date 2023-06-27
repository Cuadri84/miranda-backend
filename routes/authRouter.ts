import express from "express";
import { postLogin, getLogin } from "../controllers/authController";

const authRouter = express.Router();

// GET bookings (Read method)
authRouter.get("/", getLogin);

authRouter.post("/", postLogin);

export default authRouter;
