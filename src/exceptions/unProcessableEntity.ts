import { HttpException, ErrorCode } from "./httpException";

export class UnProcessableEntity extends HttpException {
    constructor(errors: any, message: string, errorCode: ErrorCode) {
        super(message, errorCode, 400, errors);
    }
}