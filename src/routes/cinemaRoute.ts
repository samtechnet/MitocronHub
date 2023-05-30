import  express, {Request,Response,NextFunction} from "express";

const cinemaRoute=async (app:express.Application)=>{
    app.get("/cinema")
}