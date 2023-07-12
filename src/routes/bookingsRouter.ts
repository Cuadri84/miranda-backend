import express from "express";
import {
  getBookings,
  getBooking,
  postBooking,
  // putBooking,
  deleteBooking,
} from "../controllers/mongo/bookingController";

const bookingsRouter = express.Router();

// GET bookings (Read method)
bookingsRouter.get("/", getBookings);

// GET single booking (Read method)
bookingsRouter.get("/:id", getBooking);

// POST a new booking (Create method)
bookingsRouter.post("/", postBooking);

// // PUT a booking (Update method)
// bookingsRouter.put("/:id", putBooking);

// DELETE single booking (Delete method)
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
