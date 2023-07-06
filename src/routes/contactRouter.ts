import express from "express";
import { getContacts, postContact } from "../controllers/contactController";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

// POST a new user (Create method)
contactRouter.post("/", postContact);

export default contactRouter;
