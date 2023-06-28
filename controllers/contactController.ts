import { Request, Response } from "express";
import contactsData from "../data/contact.json";

export const getContacts = function (req: Request, res: Response) {
  res.status(200).json(contactsData);
};
