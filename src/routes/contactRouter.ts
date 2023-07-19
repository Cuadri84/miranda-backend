import express from "express";
import {
  getContacts,
  postContacts,
  putContacts,
} from "../controllers/mongo/contactController";
// import { getContacts, postContact } from "../controllers/sql/contactController";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

// POST a new user (Create method)
contactRouter.post("/", postContacts);

// PUT a booking (Update method)
contactRouter.put("/:id", putContacts);

export default contactRouter;
