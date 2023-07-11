import mongoose, { Schema, Document } from "mongoose";
import { IBooking, BookingSchema } from "./bookingModel";

export interface IRoom extends Document {
  room_number: number;
  photo: string;
  photoTwo: string;
  photoThree: string;
  photoFour: string;
  photoFive: string;
  description: string;
  discountPercent: string;
  discount: string;
  cancellationPolicy: string;
  bed_type: string;
  room_facilities: string[];
  room_rate: number;
  room_offer: string;
  room_status: string;
  bookings: IBooking[];
}

const RoomSchema: Schema = new Schema({
  room_number: { type: Number, required: true },
  photo: { type: String, required: true },
  photoTwo: { type: String },
  photoThree: { type: String },
  photoFour: { type: String },
  photoFive: { type: String },
  description: { type: String },
  discountPercent: { type: String },
  discount: { type: String, required: true },
  cancellationPolicy: { type: String },
  bed_type: { type: String, required: true },
  room_facilities: { type: [String], required: true },
  room_rate: { type: Number, required: true },
  room_offer: { type: String },
  room_status: { type: String, required: true },
  bookings: { type: [BookingSchema], default: [] },
});

const RoomModel = mongoose.model<IRoom>("Room", RoomSchema);

export default RoomModel;
