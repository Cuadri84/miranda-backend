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

export const putRoom = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleRoom: string = `Editing the booking with room_number ${id}`;
  res.status(200).json(singleRoom);
};

export const deleteRoom = function (req: Request, res: Response) {
  const { id } = req.params;
  let newRoomsDataFiltered = roomsData.filter(
    (room: IRooms) => room.room_number !== Number(id)
  );
  saveToDataBase(newRoomsDataFiltered, "rooms.json");
  res.status(200).json(newRoomsDataFiltered);
};
