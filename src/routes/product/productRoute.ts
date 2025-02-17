import { Router } from "express";
import { createPorduct, deleteProduct, getByIdProduct, listOfProduct, updateProduct } from "../../controllers/productController";
import { errorHandler } from "../../error-handler";
import authMiddleware from "../../middlewares/auth";
import isAdmin from "../../middlewares/isAdmin";

const productRouter: Router = Router();

productRouter.post("/", errorHandler(createPorduct))
productRouter.put("/update/:id", errorHandler(updateProduct))
productRouter.delete("/delete/:id", errorHandler(deleteProduct))
productRouter.get("/", errorHandler(listOfProduct))
productRouter.get("/show/:id", errorHandler(getByIdProduct))

export default productRouter;
