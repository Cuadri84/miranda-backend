import { IBooking } from "../models/bookingsModel";
import { Request, Response } from "express";
import bookingsData from "../data/bookings.json";

export const getBookings = function (req: Request, res: Response) {
  res.status(200).json(bookingsData);
};

export const getBooking = function (req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  const singleBooking: string = `Made it to the single booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const postBooking = function (req: Request, res: Response) {
  const newBooking: string = "Creating new booking";
  res.status(200).json(newBooking);
};

export const putBooking = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleBooking: string = `Editing the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};

export const deleteBooking = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleBooking: string = `Deleting the booking with ID ${id}`;
  res.status(200).json(singleBooking);
};
