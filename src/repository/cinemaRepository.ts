import Cinemas from '../model/cinema'
import {client} from "../config/databaseConfig";
import Cinema from "../model/cinema";
import {ObjectId} from "mongodb";

const CinemaModel=client.db("MitochronHub").collection("MitochronHub")

class CinemaRepository{
    public async getCinemaById(id:string){

        const data=await  CinemaModel.findOne({_id: new ObjectId(id)})
        return data
    }
    public async getCinemaByName(name:string){
        const data=await CinemaModel.findOne({name:name})
        return data;
    }
    public async updateSeats(id:string, availableSeats:string){
        const data =await CinemaModel.findOneAndUpdate({_id:new ObjectId(id)}, { $set:{availableSeats}})
        return data
    }
    public async getAllCinema(){
        return  CinemaModel.find({}).toArray()
    }
    public async createCinema (cinemaData: any){
        const cinema= CinemaModel.insertOne (cinemaData);
        return cinema;
    }
    public async updateCinema(cinema:any) {
        return cinema.save();
    }
}

export default new CinemaRepository();