import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//cambiar por este connect para trabajar en local en compass
// .connect("mongodb://localhost/miranda")

const secretDbToken = process.env.MONGO_PASS;
export const mongodbconnection = mongoose
  .connect(
    `mongodb+srv://cuadri84:${secretDbToken}@miranda.ou5esvk.mongodb.net/`
  )
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); // Salir con un código de error
  });
