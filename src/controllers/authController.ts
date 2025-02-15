import { NextFunction, Request, response, Response } from "express"
import { prisma } from "../prismaConif/client";
import bcrypt from "bcrypt";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/httpException";
export async function register(req: Request, res: Response, next: NextFunction) {
    let user = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    });
    console.log("current User : " + user);

    if (user) {
        next(new BadRequestException("User already exists", ErrorCode.USER_ALREADY_EXISTS));
    }
    let password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);
    user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
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
