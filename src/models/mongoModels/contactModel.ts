import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  date: Date;
  userName: string;
  userEmail: string;
  userPhone: number;
  messageSubject: string;
  messageBody: string;
  archived: boolean;
}

const ContactSchema: Schema = new Schema({
  date: { type: Date, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: Number, required: true },
  messageSubject: { type: String, required: true },
  messageBody: { type: String, required: true },
  archived: { type: Boolean, required: true },
});

const ContactModel = mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;
