import Joi from "joi";
import { IContact } from "../models/contactModel";

export const contactValidator = Joi.object<IContact>({
  date: Joi.string().required(),
  userName: Joi.string().required().min(3).max(20),
  userEmail: Joi.string()
    .required()
    .email()
    .pattern(new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
    .max(40),
  userPhone: Joi.string()
    .required()
    .min(8)
    .max(15)
    .pattern(new RegExp("^[0-9]+$")),
  messageSubject: Joi.string().required().min(3).max(50),
  messageBody: Joi.string().required(),
});
