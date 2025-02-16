import { HttpException, ErrorCode } from "./httpException";

export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, errorCode, 404, null);
    }
}