import { IUser } from "../models/usersModel";
import { Request, Response } from "express";
import { SQLconnection } from "../db";

export const getUsers = async function (req: Request, res: Response) {
  try {
    const connection = await SQLconnection();
    const query = "SELECT * FROM users";
    const [rows] = await connection.execute(query);

    res.status(200).json(rows);
    connection.end();
    return rows;
  } catch (error) {
    console.error("Error al obtener los datos de la tabla users:", error);
    throw error;
  }
};

export const getUser = async function (
  req: Request<{ id: number }>,
  res: Response
) {
  const { id } = req.params;
  try {
    const connection = await SQLconnection();

    const query = "SELECT * FROM users WHERE id = ?";

    const [rows] = await connection.execute(query, [id]);

    if (Array.isArray(rows) && rows.length === 0) {
      connection.end();
      return res.sendStatus(404);
    }
    res.status(200).json(rows);
    connection.end();

    return rows;
  } catch (error) {
    console.error("Error al obtener el user:", error);
    res.sendStatus(500);
  }
};

export const postUser = async function (req: Request, res: Response) {
  try {
    const postUser: IUser = req.body;

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO users (photo,name,position,email,phone,date,description,state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        postUser.photo,
        postUser.name,
        postUser.position,
        postUser.email,
        postUser.phone,
        postUser.date,
        postUser.description,
        postUser.state,
      ]
    );

    await connection.end();

    res.status(200).json(postUser);
  } catch (error) {
    console.error("Error inserting user into database:", error);
    res.status(500).json({ error: "Error inserting user into database" });
  }
};

export const putUser = async function (
  req: Request<{ body: IUser; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const updatedUser: IUser = req.body;

  try {
    const connection = await SQLconnection();

    let updateFields = "";

    if (updatedUser.photo) {
      updateFields += `photo = ${connection.escape(updatedUser.photo)}, `;
    }
    if (updatedUser.name) {
      updateFields += `name = ${connection.escape(updatedUser.name)}, `;
    }
    if (updatedUser.position) {
      updateFields += `position = ${connection.escape(updatedUser.position)}, `;
    }
    if (updatedUser.email) {
      updateFields += `email = ${connection.escape(updatedUser.email)}, `;
    }
    if (updatedUser.phone) {
      updateFields += `phone = ${connection.escape(updatedUser.phone)}, `;
    }
    if (updatedUser.date) {
      updateFields += `date = ${connection.escape(
        JSON.stringify(updatedUser.date)
      )}, `;
    }

    if (updatedUser.description) {
      updateFields += `description = ${connection.escape(
        updatedUser.description
      )}, `;
    }

    if (updatedUser.state) {
      updateFields += `state = ${connection.escape(updatedUser.state)}, `;
    }

    if (updateFields !== "") {
      updateFields = updateFields.slice(0, -2); // Eliminar la coma y el espacio sobrantes al final
    }

    const query = `UPDATE users SET ${updateFields} WHERE id = ${connection.escape(
      id
    )}`;

    await connection.query(query);
    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al actualizar el user:", error);
    res.sendStatus(500);
  }
};

export const deleteUser = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    const connection = await SQLconnection();

    const query = "DELETE FROM users WHERE id = ?";

    const [result] = await connection.execute(query, [id]);

    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar al user:", error);
    res.sendStatus(500);
  }
};
