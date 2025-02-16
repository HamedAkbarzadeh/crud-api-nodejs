import { Router } from "express";
import express from "express"
import authRouter from "./auth/authRoute";
import postRoute from "./post/postRoutes";
import productRouter from "./product/productRoute";

const apiRouter: Router = Router();



apiRouter.use("/auth", authRouter)
apiRouter.use("/post", postRoute)
apiRouter.use("/product", productRouter)

export default apiRouter;