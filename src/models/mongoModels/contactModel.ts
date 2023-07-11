import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  date: Date;
  name: string;
  mail: string;
  phone: number;
  messageSubject: string;
  messageBody: string;
  archived: boolean;
}

const ContactSchema: Schema = new Schema({
  date: { type: Date, required: true },
  name: { type: String, required: true },
  mail: { type: String, required: true },
  phone: { type: String, required: true },
  messageSubject: { type: String, required: true },
  messageBody: { type: String, required: true },
  archived: { type: Boolean, required: true },
});

const ContactModel = mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;
