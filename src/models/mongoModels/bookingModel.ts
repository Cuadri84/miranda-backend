import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  id: number;
  name: string;
  orderDate: Date;
  checkIn: Date;
  checkOut: Date;
  specialRequest: string;
  roomType: string;
  status: string;
}

export const BookingSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  orderDate: { type: Date, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  specialRequest: { type: String, required: true },
  roomType: { type: String, required: true },
  status: { type: String, required: true },
});

const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);

export default BookingModel;
