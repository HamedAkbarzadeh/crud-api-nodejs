import { Request, Response } from "express";
import { prisma } from "../prismaConif/client";

export const createPost = async (req: Request, res: Response) => {
    const post = await prisma.post.create({
        data: {
            name: req.body.name,
            author: {
                connect: {
                    id: 1
                }
            }
        }
    });
    res.json({ post, message: "successfuly to added post" });

}
export async function allPost(req: Request, res: Response) {
    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    });

    res.json({ posts, message: "successfuly to show posts" });
}