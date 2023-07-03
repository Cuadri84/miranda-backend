import express from "express";
import { getContacts } from "../controllers/contactController";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

export default contactRouter;
