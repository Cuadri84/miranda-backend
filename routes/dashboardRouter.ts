import express, { Request, Response } from "express";

const dashboardRouter = express.Router();

// GET dashboard (Read method)
dashboardRouter.get("/", function (req: Request, res: Response) {
  res.send("fethcing dashboard");
});

export default dashboardRouter;
