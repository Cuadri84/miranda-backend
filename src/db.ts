import * as mysql from "mysql2";
import { createConnection, Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const secretDbToken = process.env.DB_PASS || "secretDb";
async function SQLconnection(): Promise<Connection> {
  const connection = await createConnection({
    host: "localhost",
    user: "root",
    database: "miranda",
    password: secretDbToken,
  });

  return connection;
}

async function connectToDatabase() {
  try {
    const connection = await SQLconnection();
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
connectToDatabase();

export { SQLconnection };
