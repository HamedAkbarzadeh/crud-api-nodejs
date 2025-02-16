import { Request, Response } from "express";
import { prisma } from "../prismaConif/client";

export const createPorduct = async (req: Request, res: Response) => {
    // res.send("H")
    // console.log(...req.body);

    // ...req.body,
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            tags: req.body.tags.join(",")
        }
    })
    res.json({ product, message: "successfuly to added product" });
}