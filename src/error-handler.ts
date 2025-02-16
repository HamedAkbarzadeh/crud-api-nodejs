import { NextFunction, Request, Response } from "express"
import { ErrorCode, HttpException } from "./exceptions/httpException";
import { InternalException } from "./exceptions/internalException";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;

            if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException("somting went wrong (internal error)", ErrorCode.INTERNAL_EXCEPTION, error);
            }
            next(exception);
        }
    }
}