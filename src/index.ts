import express, { Express, Request, Response } from "express";
import { PORT } from "./secret";
import apiRouter from "./routes/apiRoute";
import { errorMiddleware } from "./middlewares/errorsMiddleware";

const app: Express = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(errorMiddleware)

app.listen(PORT, () => console.log("Listen on port " + PORT));