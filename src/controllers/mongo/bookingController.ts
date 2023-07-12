import { Request, Response } from "express";
import RoomModel, { IRoom } from "../../models/mongoModels/roomModel";
import BookingModel, { IBooking } from "../../models/mongoModels/bookingModel";
import { mongodbconnection } from "../../mongodb";

// Obtener todas las reservas de una habitación
export const getBookings = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;

    const bookings = await BookingModel.find();
    res.status(200).json(bookings);
    return bookings;
  } catch (error) {
    console.error("Error al obtener las reservas:", error);
    throw error;
  }
};

// Obtener una reserva por su ID
export const getBooking = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;

    const bookingId = req.params.id;
    const booking = await BookingModel.findOne({ _id: bookingId });

    if (!booking) {
      return res.status(404).json({ message: "Booking no encontrado" });
    }

    res.status(200).json(booking);
    return booking;
  } catch (error) {
    console.error("Error al obtener la reserva:", error);
    throw error;
  }
};

// Crear una nueva reserva para una habitación
export const postBooking = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;

    const {
      name,
      orderDate,
      checkIn,
      checkOut,
      specialRequest,
      room_number,
      status,
    } = req.body;

    const newBooking: IBooking = new BookingModel({
      name,
      orderDate,
      checkIn,
      checkOut,
      specialRequest,
      room_number,
      status,
    });

    const savedBooking = await newBooking.save();
    await RoomModel.updateOne(
      { room_number },
      { $push: { bookings: savedBooking._id } }
    );

    res.status(201).json(savedBooking);
    return newBooking;
  } catch (error) {
    console.error("Error al guardar la reserva:", error);
    throw error;
  }
};

// Actualizar una reserva por su ID
export const putBooking = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const bookingId = req.params.id;
    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking no encontrado" });
    }
    res.status(200).json(updatedBooking);
    return updatedBooking;
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    throw error;
  }
};

// Eliminar una reserva
export const deleteBooking = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;

    const bookingId = req.params.id;

    // Buscar y eliminar la reserva
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    const roomNumber = deletedBooking.room_number;

    // Eliminar el _id de la reserva del array bookings en la habitación correspondiente
    await RoomModel.updateOne(
      { room_number: roomNumber },
      { $pull: { bookings: deletedBooking._id } }
    );

    res.status(200).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la reserva:", error);
    throw error;
  }
};
