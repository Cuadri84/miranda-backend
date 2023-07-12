import mongoose from "mongoose";

//cambiar por este connect para trabajar en local en compass
// .connect("mongodb://localhost/miranda")

export const mongodbconnection = mongoose
  .connect("mongodb+srv://cuadri84:cuadri84@miranda.ou5esvk.mongodb.net/")
  .then(() => {
    console.log("Conectado a la base de datos de MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1); // Salir con un código de error
  });
