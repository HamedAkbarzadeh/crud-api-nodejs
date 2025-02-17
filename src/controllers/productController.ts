import { Request, Response } from "express";
import { prisma } from "../prismaConif/client";
import { NotFoundException } from "../exceptions/notFoundException";
import { ErrorCode } from "../exceptions/httpException";

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

export const updateProduct = async (req: Request, res: Response) => {
    let product = req.body;
    try {
        if (product.tags) {
            product.tags = product.tags.join(",");
        }
        let updateProduct = await prisma.product.update({
            where: {
                id: +req.body.id
            },
            data: product
        });
        res.json({
            message: "successfuly to update product",
            updateProduct
        });
    } catch (error) {
        throw new NotFoundException("Product not found", ErrorCode.USER_NOT_FOUND);
    }
}

export const listOfProduct = async (req: Request, res: Response) => {
    const take: number = req.body.take || 5;
    const products = await prisma.product.findMany({
        skip: req.body.skip,
        take: take
    })
    res.json({
        message: "show all products",
        products
    })
}

export const getByIdProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.body.id;
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: productID
            }
        });
        res.json({
            message: "successfuly to find product",
            data: product
        });
    } catch (error) {
        throw new NotFoundException("product not founded", ErrorCode.NOTFOUND);
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productID = req.body.id;
        const product = await prisma.product.delete({
            where: {
                id: productID
            }
        })
        const message = "successfuly to delete user";
        res.json({
            message,
            data: product
        })
    } catch (error) {

    }
}