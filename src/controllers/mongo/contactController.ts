import { Request, Response } from "express";
import ContactModel from "../../models/mongoModels/contactModel";
import { mongodbconnection } from "../../mongodb";

export const getContacts = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const contacts = await ContactModel.find();
    res.status(200).json(contacts);
    return contacts;
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
    throw error;
  }
};
