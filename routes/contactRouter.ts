import express from "express";

const contactRouter = express.Router();

// GET contact (Read method)
contactRouter.get("/", getContacts);

export default contactRouter;
