import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    status: any;
    //name: void;
    //stack: string;
    constructor(message: string | undefined, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.name = this.name;
        this.stack = this.stack


        Error.captureStackTrace(this, this.constructor)
    }
};

export const catchAsync = (fn: { (req: Request, res: Response, next: NextFunction): Promise<void | undefined>; }) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};



export default AppError;