"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const users_json_1 = __importDefault(require("../data/users.json"));
const utils_1 = require("../utils/utils");
const getUsers = function (req, res) {
    res.status(200).json(users_json_1.default);
};
exports.getUsers = getUsers;
const getUser = function (req, res) {
    const { id } = req.params;
    const singleUser = users_json_1.default.find((user) => user.id === Number(id));
    if (singleUser === undefined) {
        res.sendStatus(404);
    }
    res.status(200).json(singleUser);
};
exports.getUser = getUser;
const postUser = function (req, res) {
    users_json_1.default.push(req.body);
    (0, utils_1.saveToDataBase)(users_json_1.default, "rooms.json");
    res.status(200).json(users_json_1.default);
};
exports.postUser = postUser;
const putUser = function (req, res) {
    const { id } = req.params;
    const { body } = req;
    const existingUser = users_json_1.default.find((user) => user.id === Number(id));
    if (!existingUser) {
        res.status(404).json("Booking not found");
    }
    else {
        let userUpdated = users_json_1.default.map((user) => user.id === Number(id) ? body : user);
        (0, utils_1.saveToDataBase)(userUpdated, "users.json");
        res.status(200).json(userUpdated);
    }
};
exports.putUser = putUser;
const deleteUser = function (req, res) {
    const { id } = req.params;
    let newUsersDataFiltered = users_json_1.default.filter((user) => user.id !== Number(id));
    (0, utils_1.saveToDataBase)(newUsersDataFiltered, "users.json");
    res.status(200).json(newUsersDataFiltered);
};
exports.deleteUser = deleteUser;
