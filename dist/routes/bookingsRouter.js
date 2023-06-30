"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingsController_1 = require("../controllers/bookingsController");
const bookingsRouter = express_1.default.Router();
// GET bookings (Read method)
bookingsRouter.get("/", bookingsController_1.getBookings);
// GET single booking (Read method)
bookingsRouter.get("/:id", bookingsController_1.getBooking);
// POST a new booking (Create method)
bookingsRouter.post("/", bookingsController_1.postBooking);
// PUT a booking (Update method)
bookingsRouter.put("/:id", bookingsController_1.putBooking);
// DELETE single booking (Delete method)
bookingsRouter.delete("/:id", bookingsController_1.deleteBooking);
exports.default = bookingsRouter;
