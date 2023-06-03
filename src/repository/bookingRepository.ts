import {client} from "../config/databaseConfig";
import {BookingInterface} from "../config/databaseConfig"
import Booking from "../model/booking";

const BookingModel=client.db("MitochronHub").collection("bookings");

class BookingRepository{
    public async createBooking (bookingData: BookingInterface){
        return BookingModel.insertOne(bookingData);
    }

    public async getAllBooking(){
        return  BookingModel.find({}).toArray()
    }
    public async getBookingById(id:string){
        return  Booking.findById(id).exec()
    }
}


export default new BookingRepository;