import { Request, Response } from "express";
import ContactModel, { IContact } from "../../models/mongoModels/contactModel";
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

export const postContacts = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const { date, name, mail, phone, messageSubject, messageBody, archived } =
      req.body;

    const newContact: IContact = new ContactModel({
      date,
      name,
      mail,
      phone,
      messageSubject,
      messageBody,
      archived,
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
    return savedContact;
  } catch (error) {
    console.error("Error al guardar el contacto:", error);
    throw error;
  }
};

// Actualizar una reserva por su ID
export const putContacts = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const contactId = req.params.id;
    const updatedContact = await ContactModel.findById(contactId);

    if (!updatedContact) {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }

    updatedContact.archived = !updatedContact.archived;

    await updatedContact.save();

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
    throw error;
  }
};
