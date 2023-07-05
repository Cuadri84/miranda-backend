import { IBooking } from "../models/bookingsModel";
import { Request, Response } from "express";
import { SQLconnection } from "../db";

export const getBookings = async function (req: Request, res: Response) {
  try {
    const connection = await SQLconnection();
    const query = "SELECT * FROM bookings";
    const [rows] = await connection.execute(query);

    res.status(200).json(rows);
    connection.end();
    return rows;
  } catch (error) {
    console.error("Error al obtener los datos de la tabla rooms:", error);
    throw error;
  }
};
export const getBooking = async function (
  req: Request<{ id: number }>,
  res: Response
) {
  const { id } = req.params;
  try {
    const connection = await SQLconnection();

    const query = "SELECT * FROM bookings WHERE id = ?";

    const [rows] = await connection.execute(query, [id]);

    if (Array.isArray(rows) && rows.length === 0) {
      connection.end();
      return res.sendStatus(404);
    }
    res.status(200).json(rows);
    connection.end();

    return rows;
  } catch (error) {
    console.error("Error al obtener el booking:", error);
    res.sendStatus(500);
  }
};

export const postBooking = async function (req: Request, res: Response) {
  try {
    const postBooking: IBooking = req.body;

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO bookings (roomID,userName,orderDate,checkIn,CheckOut,specialRequest,roomType,status) VALUES (?,?, ?, ?, ?, ?, ?, ?)",
      [
        postBooking.roomID,
        postBooking.userName,
        postBooking.orderDate,
        postBooking.checkIn,
        postBooking.checkOut,
        postBooking.specialRequest,
        postBooking.roomType,
        postBooking.status,
      ]
    );

    await connection.end();

    res.status(200).json(postBooking);
  } catch (error) {
    console.error("Error inserting room into database:", error);
    res.status(500).json({ error: "Error inserting room into database" });
  }
};

export const putBooking = async function (
  req: Request<{ body: IBooking; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const updatedBooking: IBooking = req.body;

  try {
    const connection = await SQLconnection();

    let updateFields = "";

    if (updatedBooking.roomID) {
      updateFields += `roomID = ${connection.escape(updatedBooking.roomID)}, `;
    }
    if (updatedBooking.userName) {
      updateFields += `userName = ${connection.escape(
        updatedBooking.userName
      )}, `;
    }

    if (updatedBooking.orderDate) {
      updateFields += `orderDate = ${connection.escape(
        updatedBooking.orderDate
      )}, `;
    }
    if (updatedBooking.checkIn) {
      updateFields += `checkIn = ${connection.escape(
        updatedBooking.checkIn
      )}, `;
    }
    if (updatedBooking.checkOut) {
      updateFields += `checkOut = ${connection.escape(
        updatedBooking.checkOut
      )}, `;
    }
    if (updatedBooking.specialRequest) {
      updateFields += `specialRequest = ${connection.escape(
        updatedBooking.specialRequest
      )}, `;
    }
    if (updatedBooking.roomType) {
      updateFields += `roomType = ${connection.escape(
        updatedBooking.roomType
      )}, `;
    }
    if (updatedBooking.status) {
      updateFields += `status = ${connection.escape(
        JSON.stringify(updatedBooking.status)
      )}, `;
    }

    if (updateFields !== "") {
      updateFields = updateFields.slice(0, -2);
    }

    const query = `UPDATE bookings SET ${updateFields} WHERE id = ${connection.escape(
      id
    )}`;

    await connection.query(query);
    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al actualizar la habitación:", error);
    res.sendStatus(500);
  }
};

export const deleteBooking = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    const connection = await SQLconnection();

    const query = "DELETE FROM bookings WHERE id = ?";

    const [result] = await connection.execute(query, [id]);

    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    res.sendStatus(500);
  }
};
