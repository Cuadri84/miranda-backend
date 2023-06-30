"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.putBooking = exports.postBooking = exports.getBooking = exports.getBookings = void 0;
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const utils_1 = require("../utils/utils");
const getBookings = function (req, res) {
    res.status(200).json(bookings_json_1.default);
};
exports.getBookings = getBookings;
const getBooking = function (req, res) {
    const { id } = req.params;
    const singleBooking = bookings_json_1.default.find((booking) => booking.id === Number(id));
    if (singleBooking === undefined) {
        res.sendStatus(404);
    }
    res.status(200).json(singleBooking);
};
exports.getBooking = getBooking;
const postBooking = function (req, res) {
    bookings_json_1.default.push(req.body);
    (0, utils_1.saveToDataBase)(bookings_json_1.default, "bookings.json");
    res.status(200).json(bookings_json_1.default);
};
exports.postBooking = postBooking;
const putBooking = function (req, res) {
    const { id } = req.params;
    const { body } = req;
    const existingBooking = bookings_json_1.default.find((booking) => booking.id === Number(id));
    if (!existingBooking) {
        res.status(404).json("Booking not found");
    }
    else {
        let bookingUpdated = bookings_json_1.default.map((booking) => booking.id === Number(id) ? body : booking);
        (0, utils_1.saveToDataBase)(bookingUpdated, "bookings.json");
        res.status(200).json(bookingUpdated);
    }
};
exports.putBooking = putBooking;
const deleteBooking = function (req, res) {
    const { id } = req.params;
    let newBookingsDataFiltered = bookings_json_1.default.filter((booking) => booking.id != Number(id));
    (0, utils_1.saveToDataBase)(newBookingsDataFiltered, "bookings.json");
    res.status(200).json(newBookingsDataFiltered);
};
exports.deleteBooking = deleteBooking;
