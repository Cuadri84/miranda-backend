import { Request, Response } from "express";
import { SQLconnection } from "../db";
import { IContact } from "../models/contactModel";

export const getContacts = async function (req: Request, res: Response) {
  try {
    const connection = await SQLconnection();
    const query = "SELECT * FROM contact";
    const [rows] = await connection.execute(query);

    res.status(200).json(rows);
    connection.end();
    return rows;
  } catch (error) {
    console.error("Error al obtener los datos de la tabla contact:", error);
    throw error;
  }
};

export const postContact = async function (req: Request, res: Response) {
  try {
    const postContact: IContact = req.body;

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO contact (date,userName,userEmail,userPhone,messageSubject,messageBody,archived) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        postContact.date,
        postContact.userName,
        postContact.userEmail,
        postContact.userPhone,
        postContact.messageSubject,
        postContact.messageBody,
        postContact.archived,
      ]
    );

    await connection.end();

    res.status(200).json(postContact);
  } catch (error) {
    console.error("Error inserting contact into database:", error);
    res.status(500).json({ error: "Error inserting contact into database" });
  }
};
