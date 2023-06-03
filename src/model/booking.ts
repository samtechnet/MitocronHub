import {Schema, model, Document} from 'mongoose';

export  interface BookingInterface extends Document {
    cinemaId:string,
    name: string;
    seats: number;

}

const bookingSchema= new Schema<BookingInterface>({
        cinemaId:{
            type:String,
            required:[true, 'id of the cinema is required']
        },
        name:{
            type:String,
            required:[true, 'Name can not be empty '],
            unique: true

        },
        seats:{
            type: Number,
            required: true,
        },

    },
    {timestamps:true});
const Booking=model<BookingInterface>('Booking', bookingSchema);
export default Booking;

