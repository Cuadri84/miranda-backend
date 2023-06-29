import { IBooking } from "../models/bookingsModel";
import { Request, Response } from "express";
import bookingsData from "../data/bookings.json";
import { saveToDataBase } from "../utils/utils";

export const getBookings = function (req: Request, res: Response) {
  res.status(200).json(bookingsData);
};

export const getBooking = function (
  req: Request<{ id: number }>,
  res: Response
) {
  const { id } = req.params;
  const singleBooking: IBooking | undefined = bookingsData.find(
    (booking: IBooking) => booking.id === Number(id)
  );
  if (singleBooking === undefined) {
    res.sendStatus(404);
  }
  res.status(200).json(singleBooking);
};

export const postBooking = function (req: Request, res: Response) {
  bookingsData.push(req.body);
  saveToDataBase(bookingsData, "bookings.json");
  res.status(200).json(bookingsData);
};

export const putBooking = function (
  req: Request<{ body: IBooking; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const { body } = req;

  const existingBooking: IBooking | undefined = bookingsData.find(
    (booking: IBooking) => booking.id === Number(id)
  );
  if (!existingBooking) {
    res.status(404).json("Booking not found");
  } else {
    let bookingUpdated = bookingsData.map((booking) =>
      booking.id === Number(id) ? body : booking
    );
    saveToDataBase(bookingUpdated, "bookings.json");
    res.status(200).json(bookingUpdated);
  }
};

export const deleteBooking = function (req: Request, res: Response) {
  const { id } = req.params;
  let newBookingsDataFiltered = bookingsData.filter(
    (booking: IBooking) => booking.id != Number(id)
  );
  saveToDataBase(newBookingsDataFiltered, "bookings.json");
  res.status(200).json(newBookingsDataFiltered);
};
