import  express, {Request,Response,NextFunction} from "express";
import bookingController from "../controller/bookingController";
import {BookingValidatorMiddleware} from "../middleware/bookingValidator";


const middleware= new BookingValidatorMiddleware();

const bookingRoute=async (app:express.Application)=>{

    app.get("/booking", bookingController.getOneBooking)
    /**
     * @openapi
     * /booking:
     *   post:
     *     description: Book a space
     *     tags:
     *       - CinemaBooking
     *   requestBody:
     *     required: true
     *     contents:
     *       application/json:
     *         schema
     *
     * */
    app.post("/booking", middleware.createBookingValidator,bookingController.create)
    /**
     * @swagger
     * /allBookings:
     *   get:
     *     description: Retrieve all created Bookings of cinema spaces!
     *     tags:
     *       - CinemaBooking
     *     responses:
     *       200:
     *         description: Successfully processed.
     */
    app.get("/allBookings", bookingController.getAllBooking)
}

export default bookingRoute;