import * as mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const secretDbToken = process.env.DB_PASS || "secretDb";
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "miranda",
  password: secretDbToken,
});

// simple query
connection.connect(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("conected"); // results contains rows returned by server
  }
});
