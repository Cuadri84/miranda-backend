import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  name: string;
  orderDate: Date;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  room_number: number;
  status: string;
}

export const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  orderDate: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  specialRequest: { type: String },
  room_number: { type: Number, required: true },
  status: { type: String, required: true },
});

const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);

export default BookingModel;
