import { Express, NextFunction, Response, Request } from "express";
import {catchAsync} from "../service/errorHandler/error";
import { StatusCodes } from "http-status-codes";
import AppUtility from "../utility/appUtility";
import CinemaService from "../service/cinemaService";
import {response} from "../utility/response";

const timestamp= AppUtility.timeStamp()
class CinemaController{
    public getAllCinema=catchAsync(async  (req:Request,res:Response)=>{
        const data= await CinemaService.getAllCinemas(req.body)

        res.status(StatusCodes.OK).json ({success:true,responseMessage:"Successfully processed", timestamp:timestamp,data})
    })

    public create=catchAsync(async  (req:Request,res:Response)=>{
        const data= await CinemaService.createCinema(req.body)
        if(data =="exist") {res.status(StatusCodes.CONFLICT).json(response(`You already booked a space with this name`,data, false));return}
        res.status(StatusCodes.OK).json ({success: true,responseMessage:"Successfully processed", timestamp:timestamp,data})
    })

}

export default new CinemaController;