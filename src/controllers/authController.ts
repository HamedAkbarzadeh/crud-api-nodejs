import { Request, response, Response } from "express"
import { prisma } from "../prismaConif/client";
import bcrypt from "bcrypt";
export async function register(req: Request, res: Response) {
    let password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.name,
            password: hashedPassowrd
        },
    });

    // user.password
    res.json({ user, message: "user created" });
}

export async function allUser(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    res.json({ users, message: "successfuly to added users" });
}
