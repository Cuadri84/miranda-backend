import { Request, Response } from "express";
import RoomModel, { IRoom } from "../../models/mongoModels/roomModel";
import { mongodbconnection } from "../../mongodb";

// Obtener todas las habitaciones
export const getRooms = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const rooms = await RoomModel.find();
    res.status(200).json(rooms);
    return rooms;
  } catch (error) {
    console.error("Error al obtener las habitaciones:", error);
    throw error;
  }
};

// Obtener una habitación por su ID
export const getRoom = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const roomId = req.params.id;
    const room = await RoomModel.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.status(200).json(room);
    return room;
  } catch (error) {
    console.error("Error al obtener la habitación:", error);
    throw error;
  }
};

// Crear una nueva habitación
export const postRoom = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const {
      room_number,
      photo,
      photoTwo,
      photoThree,
      photoFour,
      photoFive,
      description,
      discountPercent,
      discount,
      cancellationPolicy,
      bed_type,
      room_facilities,
      room_rate,
      room_offer,
      room_status,
      bookings,
    } = req.body;

    const newRoom: IRoom = new RoomModel({
      room_number,
      photo,
      photoTwo,
      photoThree,
      photoFour,
      photoFive,
      description,
      discountPercent,
      discount,
      cancellationPolicy,
      bed_type,
      room_facilities,
      room_rate,
      room_offer,
      room_status,
      bookings,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json(savedRoom);
    return savedRoom;
  } catch (error) {
    console.error("Error al guardar la habitación:", error);
    throw error;
  }
};

// Actualizar una habitación por su ID
export const putRoom = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const roomId = req.params.id;
    const updatedRoom = await RoomModel.findByIdAndUpdate(roomId, req.body, {
      new: true,
    });

    if (!updatedRoom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.status(200).json(updatedRoom);
    return updatedRoom;
  } catch (error) {
    console.error("Error al actualizar la habitación:", error);
    throw error;
  }
};

// Eliminar una habitación por su ID
export const deleteRoom = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const roomId = req.params.id;
    const deletedRoom = await RoomModel.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }

    res.status(200).json({ message: "Habitación eliminada exitosamente" });
  } catch (error) {
    console.error("Error al eliminar la habitación:", error);
    throw error;
  }
};
