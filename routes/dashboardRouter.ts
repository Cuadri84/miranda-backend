import express, { Request, Response } from "express";

const dashboardRouter = express.Router();

// GET dashboard (Read method)
dashboardRouter.get("/", function (req: Request, res: Response) {
  res.send("Dashboard");
});

export default dashboardRouter;
