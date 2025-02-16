import { Router } from "express";
import { createPorduct } from "../../controllers/productController";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../../middlewares/auth";
import isAdmin from "../../middlewares/isAdmin";

const productRouter: Router = Router();

productRouter.post("/create",[authMiddleware , isAdmin], errorHandler(createPorduct))

export default productRouter;