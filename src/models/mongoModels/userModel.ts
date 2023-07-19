import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  photo: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  date: Date;
  description: string;
  state: "ACTIVE" | "INACTIVE";
  pass: string;
}

const UserSchema: Schema = new Schema({
  photo: { type: String },
  name: { type: String, required: true },
  position: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  state: { type: String, enum: ["ACTIVE", "INACTIVE"], required: true },
  pass: { type: String },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
