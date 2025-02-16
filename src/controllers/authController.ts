import { NextFunction, Request, Response } from "express"
import { prisma } from "../prismaConif/client";
import bcrypt from "bcrypt";
import { BadRequestException } from "../exceptions/badRequest";
import { ErrorCode } from "../exceptions/httpException";
import { SignUpUserSchema } from "../schema/users";
import { UnProcessableEntity } from "../exceptions/unProcessableEntity";
import jwt from "jsonwebtoken"
import { JWT_TOKEN } from "../secret";
import { NotFoundException } from "../exceptions/notFoundException";

export async function register(req: Request, res: Response, next: NextFunction) {
    SignUpUserSchema.parse(req.body);

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


    // try {

    // } catch (error: any) {
    //     next(new UnProcessableEntity(error?.issues, "User already exists", ErrorCode.USER_ALREADY_EXISTS));

    // }
}

export async function allUser(req: Request, res: Response) {
    const users = await prisma.user.findMany();

    res.json({ users, message: "successfuly to added users" });
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // check for if exist user
    // check email
    let user = await prisma.user.findFirst({
        where: { email }
    });
    if (!user) {
        throw new NotFoundException("email or password is invalid", ErrorCode.NOTFOUND);
    }
    // check password
    const checkPwd = await bcrypt.compare(password, user.password);
    if (!checkPwd) {
        throw new NotFoundException("email or password is invalid", ErrorCode.NOTFOUND);
    }
    // generate token
    let payload: string = JWT_TOKEN!;
    const token: string = jwt.sign({ id: user.id }, payload, { expiresIn: 3600 });
    res.status(200).json({
        message: "your logged",
        data: {
            name: user.name,
            email: user.email,
            id: user.id
        },
        token
    })


}
export async function me(req: Request, res: Response) {
    res.json({
        user: req.user
    })
}