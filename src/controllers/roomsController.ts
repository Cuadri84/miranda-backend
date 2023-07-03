import { IRooms } from "../models/roomsModel";
import { Request, Response } from "express";
import roomsData from "../data/rooms.json";
import { saveToDataBase } from "../utils/utils";

export const getRooms = function (req: Request, res: Response) {
  res.status(200).json(roomsData);
};

export const getRoom = function (req: Request<{ id: number }>, res: Response) {
  const { id } = req.params;
  const singleRoom: IRooms | undefined = roomsData.find(
    (room: IRooms) => room.room_number === Number(id)
  );
  if (singleRoom === undefined) {
    res.sendStatus(404);
  }
  res.status(200).json(singleRoom);
};

export const postRoom = function (req: Request, res: Response) {
  roomsData.push(req.body);
  saveToDataBase(roomsData, "rooms.json");
  res.status(200).json(roomsData);
};

export const putRoom = function (
  req: Request<{ body: IRooms; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const { body } = req;

  const existingRoom: IRooms | undefined = roomsData.find(
    (rooms: IRooms) => rooms.room_number === Number(id)
  );
  if (!existingRoom) {
    res.status(404).json("Booking not found");
  } else {
    let roomUpdated = roomsData.map((room) =>
      room.room_number === Number(id) ? body : room
    );
    saveToDataBase(roomUpdated, "rooms.json");
    res.status(200).json(roomUpdated);
  }
};

export const deleteRoom = function (req: Request, res: Response) {
  const { id } = req.params;
  let newRoomsDataFiltered = roomsData.filter(
    (room: IRooms) => room.room_number !== Number(id)
  );
  saveToDataBase(newRoomsDataFiltered, "rooms.json");
  res.status(200).json(newRoomsDataFiltered);
};
