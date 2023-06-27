import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthUser } from "../models/authModel";
import dotenv from "dotenv";

// get config vars
dotenv.config();
const secretToken = process.env.TOKEN_SECRET || "secret";

function generateAccessToken(user: any) {
  return jwt.sign(user, secretToken as string, { expiresIn: "30m" });
}

//Authoritation: Bearer <token>
export function verifyToken(req: any, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    const result = jwt.verify(bearerToken, secretToken);
    req.token = bearerToken;
    console.log(req.token);
    next();
  } else {
    res.sendStatus(403);
  }
}

export const postLogin = function (req: Request, res: Response) {
  const user: IAuthUser[] = [{ name: "david", mail: "mail" }];
  const token = generateAccessToken({ user });
  res.json(token);
};
