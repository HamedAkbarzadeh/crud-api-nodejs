import { HttpException, ErrorCode } from "./httpException";

export class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode , errors:any) {
        super(message, errorCode, 500 , errors);
    }
}