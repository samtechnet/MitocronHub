import {Schema, model, Document} from 'mongoose';

export interface Cinemas extends Document {
    name: string;
    capacity: number;
    availableSeats: number;
}

const cinemaSchema= new Schema<Cinemas>({

    name:{
        type:String,
        required:[true, 'Name can not be empty '],
        unique: true

    },
    capacity:{
        type: Number,
        required: true,
    },
    availableSeats:{
        type: Number,
        required: true,

    }
},
    {timestamps:true});
const Cinema=model<Cinemas>('Cinema', cinemaSchema);
export default Cinema;