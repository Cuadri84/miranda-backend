import express, { Request, Response } from "express";

// GET info (Read method)
const infoRouter = express.Router();
infoRouter.get("/", function (req: Request, res: Response) {
  res.send({
    description:
      "This is a node/express app with diferent routes and Rest method",
    routes: ["login", "dashboard", "bookings", "rooms", "users", "info"],
  });
});

export default infoRouter;
