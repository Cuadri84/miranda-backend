import { IUser } from "../models/usersModel";
import { Request, Response } from "express";

export const getUsers = function (req: Request, res: Response) {
  const users: IUser[] = [
    {
      id: 1,
      photo: "string",
      name: "NADIA",
      position: "manager",
      email: "mail",
      phone: 5,
      date: 20,
      description: "the manager",
      state: "ACTIVE",
    },
    {
      id: 2,
      photo: "string",
      name: "Sam",
      position: "receptionist",
      email: "mail",
      phone: 5,
      date: 20,
      description: "reception",
      state: "ACTIVE",
    },
  ];
  res.status(200).json(users);
};

export const getUser = function (req: Request, res: Response) {
  const { id } = req.params;
  console.log(id);
  const singleUser: string = `Made it to the single booking with ID ${id}`;
  res.status(200).json(singleUser);
};

export const postUser = function (req: Request, res: Response) {
  const newUser: string = "Creating new user";
  res.status(200).json(newUser);
};

export const putUser = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleUser: string = `Editing the user with ID ${id}`;
  res.status(200).json(singleUser);
};

export const deleteUser = function (req: Request, res: Response) {
  const { id } = req.params;
  const singleUser: string = `Deleting the user with ID ${id}`;
  res.status(200).json(singleUser);
};
