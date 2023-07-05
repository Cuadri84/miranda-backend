import express, { Express } from "express";

//Router imports
import { verifyToken } from "./middleware/auth";
import authRouter from "./routes/authRouter";
import bookingsRouter from "./routes/bookingsRouter";
import contactRouter from "./routes/contactRouter";
import dashboardRouter from "./routes/dashboardRouter";
import infoRouter from "./routes/infoRouter";
import roomsRouter from "./routes/roomsRouter";
import usersRouter from "./routes/usersRouter";

export const app: Express = express();

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

//public routes
app.use("/login", authRouter);
app.use("/info", infoRouter);

//private routes
app.use("/", verifyToken, dashboardRouter);
app.use("/bookings", verifyToken, bookingsRouter);
app.use("/rooms", verifyToken, roomsRouter);
app.use("/users", verifyToken, usersRouter);
app.use("/contact", verifyToken, contactRouter);

export default app;
