import Joi from 'joi';
import {Request,Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {response} from "../utility/response";

class BookingValidator{
    createBookingSchema=Joi.object({
        cinemaId:Joi.string().min(20).required(),
        name:Joi.string().min(3).required(),
        seats:Joi.number().min(1).required()
    })
}

class BookingValidatorMiddleware{
    private validator= new BookingValidator();
    public createBookingValidator = async (req: any, res: any, next: NextFunction) => {
        try {
            const {error, validationResult} = await this.validator.createBookingSchema.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(response(`${error}`, false))
        }
    }
}

export {BookingValidatorMiddleware}