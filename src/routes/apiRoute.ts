import { Router } from "express";
import express from "express"
import authRouter from "./auth/authRoute";
import postRoute from "./post/postRoutes";

const apiRouter: Router = Router();



apiRouter.use("/auth", authRouter)
apiRouter.use("/post", postRoute)

export default apiRouter;