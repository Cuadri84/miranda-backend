import { IUser } from "../models/usersModel";
import { Request, Response } from "express";
import usersData from "../data/users.json";
import { saveToDataBase } from "../utils/utils";

export const getUsers = function (req: Request, res: Response) {
  res.status(200).json(usersData);
};

export const getUser = function (req: Request<{ id: number }>, res: Response) {
  const { id } = req.params;
  const singleUser: IUser | undefined = usersData.find(
    (user: IUser) => user.id === Number(id)
  );
  if (singleUser === undefined) {
    res.sendStatus(404);
  }
  res.status(200).json(singleUser);
};

export const postUser = function (req: Request, res: Response) {
  usersData.push(req.body);
  saveToDataBase(usersData, "rooms.json");
  res.status(200).json(usersData);
};

export const putUser = function (
  req: Request<{ body: IUser; id: any }>,
  res: Response
) {
  const { id } = req.params;
  const { body } = req;

  const existingUser: IUser | undefined = usersData.find(
    (user: IUser) => user.id === Number(id)
  );
  if (!existingUser) {
    res.status(404).json("Booking not found");
  } else {
    let userUpdated = usersData.map((user) =>
      user.id === Number(id) ? body : user
    );
    saveToDataBase(userUpdated, "users.json");
    res.status(200).json(userUpdated);
  }
};

export const deleteUser = function (req: Request, res: Response) {
  const { id } = req.params;
  let newUsersDataFiltered = usersData.filter(
    (user: IUser) => user.id !== Number(id)
  );
  saveToDataBase(newUsersDataFiltered, "users.json");
  res.status(200).json(newUsersDataFiltered);
};
