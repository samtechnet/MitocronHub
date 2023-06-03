import cinemaRepository from "../repository/cinemaRepository";
import AppError from "./errorHandler/error";
import {StatusCodes} from "http-status-codes";

class CinemaService{
    public getAllCinemas= async  (req:any)=>{
        return await cinemaRepository.getAllCinema();

}
    public createCinema=async (req:any)=>{
        try {
            const {firstName, lastName,capacity, availableSeats} = req
            let name = firstName + " " + lastName
            let findOne= await cinemaRepository.getCinemaByName(name);
            if(findOne!=null && findOne )return "exist"
            let data = {
                name,
                capacity,
                availableSeats
            };
            let create = await cinemaRepository.createCinema(data);
            return create;
        }catch (err){
            throw new AppError(`Unable to book a space with error: ${err}`, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }



}

export default new CinemaService();