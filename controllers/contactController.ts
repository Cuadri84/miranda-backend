import { IContact } from "../models/contactModel";
import { Request, Response } from "express";

export const getContacts = function (req: Request, res: Response) {
  const contacts: IContact[] = [
    {
      id: 1,
      date: 35,
      user: {
        name: "MARIO",
        email: "MAIL",
        phone: 64946,
      },
      message: {
        subject: "falta jabon",
        body: "sgdsagrsghfsaghfa",
      },

      archived: true,
    },
  ];
  res.status(200).json(contacts);
};
