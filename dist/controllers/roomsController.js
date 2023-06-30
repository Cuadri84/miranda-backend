"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.putRoom = exports.postRoom = exports.getRoom = exports.getRooms = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
const utils_1 = require("../utils/utils");
const getRooms = function (req, res) {
    res.status(200).json(rooms_json_1.default);
};
exports.getRooms = getRooms;
const getRoom = function (req, res) {
    const { id } = req.params;
    const singleRoom = rooms_json_1.default.find((room) => room.room_number === Number(id));
    if (singleRoom === undefined) {
        res.sendStatus(404);
    }
    res.status(200).json(singleRoom);
};
exports.getRoom = getRoom;
const postRoom = function (req, res) {
    rooms_json_1.default.push(req.body);
    (0, utils_1.saveToDataBase)(rooms_json_1.default, "rooms.json");
    res.status(200).json(rooms_json_1.default);
};
exports.postRoom = postRoom;
const putRoom = function (req, res) {
    const { id } = req.params;
    const { body } = req;
    const existingRoom = rooms_json_1.default.find((rooms) => rooms.room_number === Number(id));
    if (!existingRoom) {
        res.status(404).json("Booking not found");
    }
    else {
        let roomUpdated = rooms_json_1.default.map((room) => room.room_number === Number(id) ? body : room);
        (0, utils_1.saveToDataBase)(roomUpdated, "rooms.json");
        res.status(200).json(roomUpdated);
    }
};
exports.putRoom = putRoom;
const deleteRoom = function (req, res) {
    const { id } = req.params;
    let newRoomsDataFiltered = rooms_json_1.default.filter((room) => room.room_number !== Number(id));
    (0, utils_1.saveToDataBase)(newRoomsDataFiltered, "rooms.json");
    res.status(200).json(newRoomsDataFiltered);
};
exports.deleteRoom = deleteRoom;
