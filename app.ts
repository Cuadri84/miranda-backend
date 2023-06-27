import express, { Request, Response, Express } from "express";

//Router imports
import dashboardRouter from "./routes/dashboardRouter";
import bookingsRouter from "./routes/bookingsRouter";
import roomsRouter from "./routes/roomsRouter";
import usersRouter from "./routes/usersRouter";
import contactRouter from "./routes/contactRouter";
// import authRouter from "./routes/authRouter";

const app: Express = express();
const PORT = 3000;

// Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());

app.use("/", dashboardRouter);
app.use("/bookings", bookingsRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);
app.use("/contacts", contactRouter);
// app.use("/login", authRouter);

app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
