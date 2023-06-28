import { Request, Response } from "express";

import { IAuthUser } from "../models/authModel";
import { generateAccessToken } from "../middleware/auth";

export const getLogin = function (req: Request, res: Response) {
  res.send("Login");
};

export const postLogin = function (req: Request, res: Response) {
  const user: IAuthUser[] = [{ name: "david", mail: "mail", pass: "d" }];
  const token = generateAccessToken({ user });
  res.json(token);
};
