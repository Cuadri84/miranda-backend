import { IRooms } from "../models/roomsModel";
import { Request, Response } from "express";
import { SQLconnection } from "../db";
// import { fakerRoom } from "../seeds/roomSeed";

export const getRooms = async function (req: Request, res: Response) {
  try {
    const connection = await SQLconnection();
    const query = "SELECT * FROM rooms";
    const [rows] = await connection.execute(query);

    res.status(200).json(rows);
    connection.end();
    return rows;
  } catch (error) {
    console.error("Error al obtener los datos de la tabla rooms:", error);
    throw error;
  }
};

export const getRoom = async function (
  req: Request<{ id: number }>,
  res: Response
) {
  const { id } = req.params;
  try {
    const connection = await SQLconnection();

    const query = "SELECT * FROM rooms WHERE room_number = ?";

    const [rows] = await connection.execute(query, [id]);

    if (Array.isArray(rows) && rows.length === 0) {
      connection.end();
      return res.sendStatus(404);
    }
    res.status(200).json(rows);
    connection.end();

    return rows;
  } catch (error) {
    console.error("Error al obtener la habitación:", error);
    res.sendStatus(500);
  }
};

export const postRoom = async function (req: Request, res: Response) {
  try {
    // const fakeRoom = fakerRoom(); use to create fake rooms
    const postRoom: IRooms = req.body;

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO rooms (room_number, photo, photoTwo, photoThree, photoFour, photoFive, description, discountPercent, discount, cancellationPolicy, bed_type, room_facilities, room_rate, room_offer, room_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        postRoom.room_number,
        postRoom.photo,
        postRoom.photoTwo,
        postRoom.photoThree,
        postRoom.photoFour,
        postRoom.photoFive,
        postRoom.description,
        postRoom.discountPercent,
        postRoom.discount,
        postRoom.cancellationPolicy,
        postRoom.bed_type,
        postRoom.room_facilities,
        postRoom.room_rate,
        postRoom.room_offer,
        postRoom.room_status,
      ]
    );

    await connection.end();

    res.status(200).json(postRoom);
  } catch (error) {
    console.error("Error inserting room into database:", error);
    res.status(500).json({ error: "Error inserting room into database" });
  }
};

export const putRoom = async function (
  req: Request<{ body: IRooms; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const updatedRoom: IRooms = req.body;

  try {
    const connection = await SQLconnection();

    let updateFields = "";

    if (updatedRoom.room_number) {
      updateFields += `room_number = ${connection.escape(
        updatedRoom.room_number
      )}, `;
    }
    if (updatedRoom.photo) {
      updateFields += `photo = ${connection.escape(updatedRoom.photo)}, `;
    }
    if (updatedRoom.photoTwo) {
      updateFields += `photoTwo = ${connection.escape(updatedRoom.photoTwo)}, `;
    }
    if (updatedRoom.photoThree) {
      updateFields += `photoThree = ${connection.escape(
        updatedRoom.photoThree
      )}, `;
    }
    if (updatedRoom.photoFour) {
      updateFields += `photoFour = ${connection.escape(
        updatedRoom.photoFour
      )}, `;
    }
    if (updatedRoom.photoFive) {
      updateFields += `photoFive = ${connection.escape(
        updatedRoom.photoFive
      )}, `;
    }
    if (updatedRoom.description) {
      updateFields += `description = ${connection.escape(
        updatedRoom.description
      )}, `;
    }
    if (updatedRoom.discountPercent) {
      updateFields += `discountPercent = ${connection.escape(
        updatedRoom.discountPercent
      )}, `;
    }
    if (updatedRoom.discount) {
      updateFields += `discount = ${connection.escape(updatedRoom.discount)}, `;
    }
    if (updatedRoom.cancellationPolicy) {
      updateFields += `cancellationPolicy = ${connection.escape(
        updatedRoom.cancellationPolicy
      )}, `;
    }
    if (updatedRoom.bed_type) {
      updateFields += `bed_type = ${connection.escape(updatedRoom.bed_type)}, `;
    }
    if (updatedRoom.room_facilities) {
      updateFields += `room_facilities = ${connection.escape(
        JSON.stringify(updatedRoom.room_facilities)
      )}, `;
    }
    if (updatedRoom.room_rate) {
      updateFields += `room_rate = ${connection.escape(
        updatedRoom.room_rate
      )}, `;
    }
    if (updatedRoom.room_offer) {
      updateFields += `room_offer = ${connection.escape(
        updatedRoom.room_offer
      )}, `;
    }
    if (updatedRoom.room_status) {
      updateFields += `room_status = ${connection.escape(
        updatedRoom.room_status
      )}, `;
    }

    if (updateFields !== "") {
      updateFields = updateFields.slice(0, -2); // Eliminar la coma y el espacio sobrantes al final
    }

    const query = `UPDATE rooms SET ${updateFields} WHERE room_number = ${connection.escape(
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

export const deleteRoom = async function (req: Request, res: Response) {
  try {
    const { id } = req.params;

    const connection = await SQLconnection();

    const query = "DELETE FROM rooms WHERE id = ?";

    const [result] = await connection.execute(query, [id]);

    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    res.sendStatus(500);
  }
};
