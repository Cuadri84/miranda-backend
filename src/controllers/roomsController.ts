import { IRooms } from "../models/roomsModel";
import { Request, Response } from "express";
import { SQLconnection } from "../db";
import { fakerRoom } from "../seeds/roomSeed";

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
    const fakeRoom = fakerRoom();
    const postRoom: IRooms = req.body;

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO rooms (id, room_number, photo, photoTwo, photoThree, photoFour, photoFive, description, discountPercent, discount, cancellationPolicy, bed_type, room_facilities, room_rate, room_offer, room_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        postRoom.id || fakeRoom.id,
        postRoom.room_number || fakeRoom.room_number,
        postRoom.photo || fakeRoom.photo,
        postRoom.photoTwo || fakeRoom.photoTwo,
        postRoom.photoThree || fakeRoom.photoThree,
        postRoom.photoFour || fakeRoom.photoFour,
        postRoom.photoFive || fakeRoom.photoFive,
        postRoom.description || fakeRoom.description,
        postRoom.discountPercent || fakeRoom.discountPercent,
        postRoom.discount || fakeRoom.discount,
        postRoom.cancellationPolicy || fakeRoom.cancellationPolicy,
        postRoom.bed_type || fakeRoom.bed_type,
        postRoom.room_facilities || JSON.stringify(fakeRoom.room_facilities),
        postRoom.room_rate || fakeRoom.room_rate,
        postRoom.room_offer || fakeRoom.room_offer,
        postRoom.room_status || fakeRoom.room_status,
      ]
    );

    await connection.end();

    res.status(200).json(postRoom || fakeRoom);
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

    const query = `UPDATE rooms SET
    room_number = ${connection.escape(updatedRoom.room_number)},
    photo = ${connection.escape(updatedRoom.photo)},
    photoTwo = ${connection.escape(updatedRoom.photoTwo)},
    photoThree = ${connection.escape(updatedRoom.photoThree)},
    photoFour = ${connection.escape(updatedRoom.photoFour)},
    photoFive = ${connection.escape(updatedRoom.photoFive)},
    description = ${connection.escape(updatedRoom.description)},
    discountPercent = ${connection.escape(updatedRoom.discountPercent)},
    discount = ${connection.escape(updatedRoom.discount)},
    cancellationPolicy = ${connection.escape(updatedRoom.cancellationPolicy)},
    bed_type = ${connection.escape(updatedRoom.bed_type)},
    room_facilities = ${connection.escape(
      JSON.stringify(updatedRoom.room_facilities)
    )},
    room_rate = ${connection.escape(updatedRoom.room_rate)},
    room_offer = ${connection.escape(updatedRoom.room_offer)},
    room_status = ${connection.escape(updatedRoom.room_status)}
    WHERE room_number = ${connection.escape(id)}`;

    // Ejecutar la consulta SQL
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

    const query = "DELETE FROM rooms WHERE room_number = ?";

    const [result] = await connection.execute(query, [id]);

    connection.end();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    res.sendStatus(500);
  }
};
