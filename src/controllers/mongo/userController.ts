import { Request, Response } from "express";
import UserModel, { IUser } from "../../models/mongoModels/userModel";
import { mongodbconnection } from "../../mongodb";

export const getUsers = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const users = await UserModel.find();
    res.status(200).json(users);
    return users;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};

export const getUser = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
    return user;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
};

export const postUser = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const { photo, name, position, email, phone, date, description, state } =
      req.body;

    const newUser: IUser = new UserModel({
      photo,
      name,
      position,
      email,
      phone,
      date,
      description,
      state,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
    return savedUser;
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    throw error;
  }
};

export const putUser = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const userId = req.params.id; // ID del usuario obtenido desde la ruta
    const { photo, name, position, email, phone, date, description, state } =
      req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        photo,
        name,
        position,
        email,
        phone,
        date,
        description,
        state,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const deleteUser = async function (req: Request, res: Response) {
  try {
    await mongodbconnection;
    const userId = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};
