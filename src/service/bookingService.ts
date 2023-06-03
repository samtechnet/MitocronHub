import cinemaRepository from "../repository/cinemaRepository";
import AppError from "./errorHandler/error";
import {StatusCodes} from "http-status-codes";
import bookingRepository from "../repository/bookingRepository";
import {Semaphore, withTimeout, Mutex} from "async-mutex";

const mutex= new Mutex();
const MAX_CONCURRENT_BOOKINGS=1 //Maximum number of concurrent booking allowed at a time


class BookingService{
    public bookCinema=async (req:any)=>{
        try {
            const {cinemaId,firstName, lastName,seats} = req
            let name = firstName + " " + lastName
            let data = {
                cinemaId,
                name,
                seats,

            };
            // Acquire the semaphore
            await mutex.acquire()
            // Retrieve the cinema from the database
            const cinema=await cinemaRepository.getCinemaById(cinemaId);
            if(!cinema){
                mutex.release()
                return `Cinema not found`
            }
            // Check if the requested number of seats is available

            if(cinema.availableSeats >=seats){
                // Book the seats
                cinema.availableSeats -=seats;
                await cinemaRepository.updateSeats(cinemaId, cinema.availableSeats)
                const createBooking=await bookingRepository.createBooking(data)
                mutex.release() // Release the semaphore
                return createBooking;

            }else{
                mutex.release();// Release the semaphore
                return `Insufficient seats available`
            }

        }catch (err){
            mutex.release();// Release the semaphore
            throw new AppError(`An error occurred while booking seats: ${err}`, StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    public getAllBookings= async  ()=>{
        return await bookingRepository.getAllBooking();

    }
    public getOneBooking=async  (id:string)=>{
        return await bookingRepository.getBookingById(id);

    }

}

export default new BookingService();