import { Router } from "express";
import { allPost, createPost } from "../../controllers/postController";

const postRoute = Router();

postRoute.post("/create", createPost)
postRoute.get("/all", allPost)

export default postRoute;