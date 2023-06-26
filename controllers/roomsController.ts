import { IRooms } from "../models/roomsModel";
import { Request, Response } from "express";

export const getRooms = function (req: Request, res: Response) {
  const bookings: IRooms[] = [
    {
      id: "Suite",
      room_number: 1,

      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      photoTwo: "",
      photoThree: "",
      photoFour: "",
      photoFive: "",
      description: "nice room",
      discountPercent: 5,
      discount: 10,
      cancellationPolicy: "",
      bed_type: "big",
      room_facilities: ["wifi", "minibar"],
      room_rate: 5,
      room_offer: 5,
      room_status: "booked",
    },
    {
      id: "normal",
      room_number: 2,

      photo:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      photoTwo: "",
      photoThree: "",
      photoFour: "",
      photoFive: "",
      description: "single room",
      discountPercent: 5,
      discount: 10,
      cancellationPolicy: "",
      bed_type: "small",
      room_facilities: ["wifi", "minibar"],
      room_rate: 5,
      room_offer: 5,
      room_status: "free",
    },
  ];
  res.status(200).json(bookings);
};

export const getRoom = function (req: Request<{ id: number }>, res: Response) {
  const id = Number(req.params.id);
  console.log(id);
  const singleRoom: string = `Made it to the single booking with room_number ${id}`;
  res.status(200).json(singleRoom);
};

export const postRoom = function (req: Request, res: Response) {
  const newRoom: string = "Creating new room";
  res.status(200).json(newRoom);
};

export const putRoom = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleRoom: string = `Editing the booking with room_number ${id}`;
  res.status(200).json(singleRoom);
};

export const deleteRoom = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleRoom: string = `Deleting the booking with room number ${id}`;
  res.status(200).json(singleRoom);
};
