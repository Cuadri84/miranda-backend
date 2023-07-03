import * as mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "miranda",
  password: "1984",
});

// simple query
connection.connect(function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("conected"); // results contains rows returned by server
  }
});
