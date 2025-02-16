import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_TOKEN } from "../secret";
import { UnAuthorizedException } from "../exceptions/unAuthorized";
import { ErrorCode } from "../exceptions/httpException";
import { prisma } from "../prismaConif/client";
import { User } from "@prisma/client";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //extract token from header
    const token: string = req.header("x-token-auth")!;
    if (!token) {
        next(new UnAuthorizedException("UnAuthorized", ErrorCode.UNAUTHORIZED));
    }

    try {
        interface jwtPaload {
            id: string;
        }
        const decode = jwt.verify(token, JWT_TOKEN!) as jwtPaload;
        const user = await prisma.user.findFirst({ where: { id: Number(decode.id) } });
        if (!user) {
            next(new UnAuthorizedException("UnAuthorized", ErrorCode.UNAUTHORIZED));
        }
        req.user = user as User;
        next();
    } catch (error) {
        next(new UnAuthorizedException("UnAuthorized", ErrorCode.UNAUTHORIZED));
    }
}
export default authMiddleware;