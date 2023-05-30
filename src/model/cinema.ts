import {Schema, model, Document} from 'mongoose';

export interface Cinema extends Document {
    name: string;
    capacity: number;
    availableSeats: number;
}

const cinemaSchema= new Schema<Cinema>({

    name:{
        type:String,
        required:[true, 'Name can not be empty '],

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

export default model<Cinema>('Cinema', cinemaSchema);