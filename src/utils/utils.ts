import crypto from "crypto";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const salt = process.env.SALT || "secretSalt";

export const saveToDataBase = (value: any, filename: string) => {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(value), {
    encoding: "utf-8",
  });
};

export function hashPassword(password: string) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}
