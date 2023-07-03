"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.saveToDataBase = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const saveToDataBase = (value, filename) => {
    fs_1.default.writeFileSync(`./data/${filename}`, JSON.stringify(value), {
        encoding: "utf-8",
    });
};
exports.saveToDataBase = saveToDataBase;
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString("hex");
    return crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}
exports.hashPassword = hashPassword;
