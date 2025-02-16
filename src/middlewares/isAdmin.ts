import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../exceptions/unAuthorized";
import { ErrorCode } from "../exceptions/httpException";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    let user = req.user;
    if (user?.role == "ADMIN") {
        next();
    } else {
        next(new UnAuthorizedException("UnAuthorizen (no admin)", ErrorCode.UNAUTHORIZED));
    }
}

export default isAdmin;