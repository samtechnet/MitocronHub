import express, { NextFunction, Request, Response } from "express";
import AppError from "../service/errorHandler/error"
import dotenv from "dotenv";

dotenv.config();

const sendErrorDev = (err: AppError, res: Response) => {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        success: err.statusCode,
        message: err.message,
        error: err,
        stack: err.stack,
        name: err.name
    });
};

const sendErrorProd = (err: AppError, res: Response,) => {
    const statusCode = err.statusCode || 500;
    if (err.isOperational) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            //stack: err.stack,
            name: err.name,
            operation: err.isOperational,

        })

    };


};

const errorController = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    //err.status = err.status || "error";
    if (process.env.ENV === "dev") {
        sendErrorDev(err, res);
    };
    if (process.env.ENV === "prod") {
        sendErrorProd(err, res);
        let error = { ...err };
        console.log("let see whats coming from error")
        console.log(error)
        if (error.name === 'ExpiredCodeException') {
            const message = error.message;
            const status = error.statusCode || 401;

            return res.status(status).json({
                success: false,
                message: message
            })
        };
        // if (error.name === "Error") {
        //     res.status(error.statusCode || 401)
        //     return res.json({
        //         success: false,
        //         message: error.message
        //     })
        // };
        if (error.name === "NotAuthorizedException") {
            const status = error.statusCode || 401;
            return res.status(status).json({
                success: false,
                error: error.message
            })
        };
        if (error.name === "TokenExpiredError") {
            const status = error.statusCode || 401;
            return res.status(status).json({
                success: false,
                error: error.message
            })
        };
    } else {
        return res.status(err.statusCode || 501).json({
            success: false,
            error: err.message,
            message: "Something went wrong, please contact Admin",
        })
    }
};

export {errorController} ;