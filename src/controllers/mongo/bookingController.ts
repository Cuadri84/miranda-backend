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

// // Obtener una reserva por su ID
// export const getBooking = async function (req: Request, res: Response) {
//   try {
//     await mongodbconnection;
//     const roomId = req.params.roomId;
//     const bookingId = Number(req.params.bookingId);
//     const room = await RoomModel.findById(roomId);

//     if (!room) {
//       return res.status(404).json({ message: "Habitación no encontrada" });
//     }

//     const booking = room.bookings.find((booking) => booking.id === bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Reserva no encontrada" });
//     }

//     res.status(200).json(booking);
//     return booking;
//   } catch (error) {
//     console.error("Error al obtener la reserva:", error);
//     throw error;
//   }
// };

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

// // Actualizar una reserva por su ID
// export const putBooking = async function (req: Request, res: Response) {
//   try {
//     await mongodbconnection;
//     const roomId = req.params.roomId;
//     const bookingId = Number(req.params.bookingId);
//     const room = await RoomModel.findById(roomId);

//     if (!room) {
//       return res.status(404).json({ message: "Habitación no encontrada" });
//     }

//     const bookingIndex = room.bookings.findIndex(
//       (booking) => booking.id === bookingId
//     );
//     if (bookingIndex === -1) {
//       return res.status(404).json({ message: "Reserva no encontrada" });
//     }

//     const bookingToUpdate = room.bookings[bookingIndex];
//     bookingToUpdate.id = req.body.id;
//     bookingToUpdate.name = req.body.name;
//     bookingToUpdate.orderDate = req.body.orderDate;
//     bookingToUpdate.checkIn = req.body.checkIn;
//     bookingToUpdate.checkOut = req.body.checkOut;
//     bookingToUpdate.specialRequest = req.body.specialRequest;
//     bookingToUpdate.roomType = req.body.roomType;
//     bookingToUpdate.status = req.body.status;

//     await room.save();

//     res.status(200).json(bookingToUpdate);
//     return bookingToUpdate;
//   } catch (error) {
//     console.error("Error al actualizar la reserva:", error);
//     throw error;
//   }
// };

// // Eliminar una reserva por su ID
// export const deleteBooking = async function (req: Request, res: Response) {
//   try {
//     await mongodbconnection;
//     const roomId = req.params.roomId;
//     const bookingId = Number(req.params.bookingId);
//     const room = await RoomModel.findById(roomId);

//     if (!room) {
//       return res.status(404).json({ message: "Habitación no encontrada" });
//     }

//     const bookingIndex = room.bookings.findIndex(
//       (booking) => booking.id === bookingId
//     );
//     if (bookingIndex === -1) {
//       return res.status(404).json({ message: "Reserva no encontrada" });
//     }

//     room.bookings.splice(bookingIndex, 1);
//     await room.save();

//     res.status(200).json({ message: "Reserva eliminada exitosamente" });
//   } catch (error) {
//     console.error("Error al eliminar la reserva:", error);
//     throw error;
//   }
// };
