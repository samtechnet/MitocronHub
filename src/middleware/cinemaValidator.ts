import Joi from 'joi';
import {Request,Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {response} from "../utility/response";

class CinemaValidator{
    /**
     * @openapi
     * components:
     *   schemas:
     *     registrationSchema:
     *       type: object
     *       required:
     *         - firstName
     *         - lastName
     *         - capacity
     *         - availableSeats
     *       properties:
     *         firstName:
     *           type: string
     *         lastName:
     *           type: string
     *         capacity:
     *           type: integer
     *           format: int32
     *         availableSeats:
     *           type: integer
     *           format: int32
     */
    registrationSchema=Joi.object({
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        capacity: Joi.number().required().min(1),
        availableSeats:Joi.number().required().min(1)
    })
    bookingSchema=Joi.object({
        cinemaId:Joi.string().min(20).required(),
        firstName: Joi.string().required().min(3),
        lastName: Joi.string().required().min(3),
        seats: Joi.number().min(1).required()
    })
}

class CinemaValidatorMiddleware {
    private validator = new CinemaValidator()
    public registrationValidator = async (req: any, res: any, next: NextFunction) => {
        try {
            const {error, validationResult} = await this.validator.registrationSchema.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(response(`${error}`, false))
        }
    }

    public bookingValidator = async (req: any, res: any, next: NextFunction) => {
        try {
            const {error, validationResult} = await this.validator.bookingSchema.validateAsync(req.body);
            next()
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(response(`${error}`, false))
        }
    }
};

export {CinemaValidatorMiddleware}