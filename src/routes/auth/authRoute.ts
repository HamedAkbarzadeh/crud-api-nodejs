import { Router } from "express";
import { allUser, register } from "../../controllers/authController";

const authRouter: Router = Router();


authRouter.post("/register", register);

authRouter.get("/all" , allUser);

export default authRouter;