import { Router } from "express";
import { register } from "../../controllers/authController";

const authRouter: Router = Router();


authRouter.post("/register" , register);