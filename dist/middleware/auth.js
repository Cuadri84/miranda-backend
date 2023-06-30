"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateAccessToken = exports.isUserAuthenticated = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretToken = process.env.TOKEN_SECRET || "secret";
const isUserAuthenticated = (user) => {
    if (user.name === "david" && user.mail === "mail" && user.pass === "d") {
        return true;
    }
    else {
        return false;
    }
};
exports.isUserAuthenticated = isUserAuthenticated;
//Function that creates the token
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user.name, secretToken);
}
exports.generateAccessToken = generateAccessToken;
//Function to verify the token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        const result = jsonwebtoken_1.default.verify(bearerToken, secretToken);
        req.token = bearerToken;
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.verifyToken = verifyToken;
