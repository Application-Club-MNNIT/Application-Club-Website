// a wrapper function to attach a catch function call to the passed async function fn.
import {Request, Response, NextFunction} from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next); // Catch errors and pass to next()
    };
};

export default catchAsync;
