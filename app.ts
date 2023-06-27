import express, { Express } from "express";

//Router imports
import { verifyToken } from "./controllers/authController";
import authRouter from "./routes/authRouter";
import bookingsRouter from "./routes/bookingsRouter";
import contactRouter from "./routes/contactRouter";
import dashboardRouter from "./routes/dashboardRouter";
import infoRouter from "./routes/infoRouter";
import roomsRouter from "./routes/roomsRouter";
import usersRouter from "./routes/usersRouter";

const app: Express = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

//public routes
app.use("/login", authRouter);
app.use("/info", infoRouter);

//private routes
app.use("/", verifyToken, dashboardRouter);
app.use("/bookings", bookingsRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);
app.use("/contacts", contactRouter);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
