import { IRooms } from "../models/roomsModel";
import { Request, Response } from "express";
import roomsData from "../data/rooms.json";
import { saveToDataBase } from "../utils/utils";
import * as faker from "@faker-js/faker";
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

    const connection = await SQLconnection();

    await connection.execute(
      "INSERT INTO rooms (id, room_number, photo, photoTwo, photoThree, photoFour, photoFive, description, discountPercent, discount, cancellationPolicy, bed_type, room_facilities, room_rate, room_offer, room_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)",
      [
        fakeRoom.id,
        fakeRoom.room_number,
        fakeRoom.photo,
        fakeRoom.photoTwo,
        fakeRoom.photoThree,
        fakeRoom.photoFour,
        fakeRoom.photoFive,
        fakeRoom.description,
        fakeRoom.discountPercent,
        fakeRoom.discount,
        fakeRoom.cancellationPolicy,
        fakeRoom.bed_type,
        JSON.stringify(fakeRoom.room_facilities),
        fakeRoom.room_rate,
        fakeRoom.room_offer,
        fakeRoom.room_status,
      ]
    );

    await connection.end();

    res.status(200).json(fakeRoom);
  } catch (error) {
    console.error("Error inserting room into database:", error);
    res.status(500).json({ error: "Error inserting room into database" });
  }
};

// export const putRoom = function (
//   req: Request<{ body: IRooms; id: any }>,
//   res: Response
// ) {
//   const { id } = req.params;
//   const { body } = req;

//   const existingRoom: IRooms | undefined = roomsData.find(
//     (rooms: IRooms) => rooms.room_number === Number(id)
//   );
//   if (!existingRoom) {
//     res.status(404).json("Booking not found");
//   } else {
//     let roomUpdated = roomsData.map((room) =>
//       room.room_number === Number(id) ? body : room
//     );
//     saveToDataBase(roomUpdated, "rooms.json");
//     res.status(200).json(roomUpdated);
//   }
// };

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
