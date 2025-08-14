// an Error object that will be returned whenever there is some operational error

class AppError extends Error {
    // variables in a class are defined differently as you define them in globally
    statusCode: number;
    status: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
