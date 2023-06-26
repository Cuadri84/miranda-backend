import express from "express";

const authRouter = express.Router();

authRouter.post("/", postLogin);

export default authRouter;
