import * as mysql from "mysql2";
import { createConnection, Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const secretDbToken = process.env.DB_PASS || "secretDb";
// create the connection to database
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

    // Realizar consultas u otras operaciones con la base de datos aquí

    // Cerrar la conexión cuando hayas terminado
    // await connection.end();
    // console.log("Disconnected from database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
connectToDatabase();

export { SQLconnection };
