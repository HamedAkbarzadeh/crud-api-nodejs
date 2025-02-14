import express, { Express, Request, Response } from "express";
import { PORT } from "./secret";

const app: Express = express();


app.get("/", (req: Request, res: Response) => {
    res.send("welcome")
});

app.listen(PORT, () => console.log("Listen to port " + PORT));