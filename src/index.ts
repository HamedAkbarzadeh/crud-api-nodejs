import express, { Express, Request, Response } from "express";
import { PORT } from "./secret";
import apiRouter from "./routes/apiRoute";

const app: Express = express();

app.use(express.json());


app.use("/api", apiRouter);

app.listen(PORT, () => console.log("Listen on port " + PORT));