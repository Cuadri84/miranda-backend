import mongoose from "mongoose";

export const mongodbconnection = mongoose
  .connect("mongodb://localhost/miranda")
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); // Salir con un código de error
  });
