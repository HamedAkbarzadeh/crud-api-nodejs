import { Router } from "express";
import { allUser, login, me, register } from "../../controllers/authController";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../../middlewares/auth";

const authRouter: Router = Router();


authRouter.post("/register", errorHandler(register));
authRouter.post("/login", errorHandler(login))
authRouter.get("/me", [authMiddleware], errorHandler(me))
authRouter.get("/all", errorHandler(allUser));

export default authRouter;