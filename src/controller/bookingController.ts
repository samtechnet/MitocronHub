import { Express, NextFunction, Response, Request } from "express";
import {catchAsync} from "../service/errorHandler/error";
import { StatusCodes } from "http-status-codes";
import AppUtility from "../utility/appUtility";
import BookingService from "../service/bookingService";
import {response} from "../utility/response";

import bookingService from "../service/bookingService";


const timestamp= AppUtility.timeStamp();



class BookingController{
    public create=catchAsync(async  (req:Request,res:Response)=>{
        const data= await bookingService.bookCinema(req.body)
        //if(data =="exist") {res.status(StatusCodes.CONFLICT).json(response(`You already booked a space with this name`,data, false));return}
        if(data =="Insufficient seats available") {res.status(StatusCodes.BAD_REQUEST).json(response(`Insufficient seats available`,data, false));return}
        if(data =="Cinema not found") {res.status(StatusCodes.CONFLICT).json(response(`Cinema not found`,data, false));return}
        res.status(StatusCodes.OK).json ({success: true,responseMessage:"Successfully created", timestamp:timestamp,data})
    })
    public getAllBooking=catchAsync(async  (req:Request,res:Response)=>{
        const data= await bookingService.getAllBookings();
        res.status(StatusCodes.OK).json ({success: true,responseMessage:"Successfully processed", timestamp:timestamp,data})
    })
    public getOneBooking=catchAsync(async  (req:Request,res:Response)=>{
        const data= await bookingService.getOneBooking(req.body.cinemaId);
        res.status(StatusCodes.OK).json ({success: true,responseMessage:"Successfully processed", timestamp:timestamp,data})
    })
}

export default new BookingController();