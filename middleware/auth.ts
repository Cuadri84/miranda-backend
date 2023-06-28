import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
dotenv.config();
const secretToken = process.env.TOKEN_SECRET || "secret";

//Function that creates the token
export function generateAccessToken(user: any) {
  return jwt.sign(user, secretToken as string, { expiresIn: "30m" });
}

//Function to verify the token
export function verifyToken(req: any, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    const result = jwt.verify(bearerToken, secretToken);
    //inside result it returns me the data we put on the IAuthUser inside postLogin
    console.log(result);
    req.token = bearerToken;
    console.log(req.token);
    next();
  } else {
    res.sendStatus(403);
  }
}
