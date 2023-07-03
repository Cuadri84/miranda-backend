import crypto from "crypto";
import fs from "fs";

export const saveToDataBase = (value: any, filename: string) => {
  fs.writeFileSync(`./data/${filename}`, JSON.stringify(value), {
    encoding: "utf-8",
  });
};

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}
