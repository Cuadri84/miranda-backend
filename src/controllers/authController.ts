import { Request, Response } from "express";
import { generateAccessToken, isUserAuthenticated } from "../middleware/auth";

export const getLogin = function (req: Request, res: Response) {
  res.send("Login");
};

export const postLogin = function (req: Request, res: Response) {
  if (isUserAuthenticated(req.body) === true) {
    const token = generateAccessToken(req.body);
    res.json(token);
  } else {
    return res.send(401).json({ message: "User invalid" });
  }
};
