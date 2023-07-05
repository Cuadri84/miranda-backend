import { Request, Response } from "express";
import { SQLconnection } from "../db";

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
