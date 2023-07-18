import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ILogin } from "../models/loginModel";

dotenv.config();
const secretToken = process.env.TOKEN_SECRET || "secret";

export const isUserAuthenticated = (user: ILogin) => {
  if (user.name === "david" && user.mail === "mail" && user.pass === "d") {
    return true;
  } else {
    return false;
  }
};

//Function that creates the token
export function generateAccessToken(user: ILogin) {
  return jwt.sign(user.name, secretToken as string);
}

//Function to verify the token
export function verifyToken(req: any, res: Response, next: NextFunction) {
  next();
  return;
  // const bearerHeader = req.headers["authorization"];

  // if (typeof bearerHeader !== "undefined") {
  //   const bearerToken = bearerHeader.split(" ")[1];
  //   const result = jwt.verify(bearerToken, secretToken);
  //   req.token = bearerToken;
  //   next();
  // } else {
  //   res.sendStatus(403);
  // }
}
