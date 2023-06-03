import {MongoClient, ServerApiVersion} from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();
const {DataBasePassword, DatabaseUsername}=process.env
const uri=`mongodb+srv://${DatabaseUsername}:${DataBasePassword}@gallery-one-app.h2qyv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi:{
        version: ServerApiVersion.v1,
        strict:true,
        deprecationErrors:true
    },
    connectTimeoutMS:30000,
    socketTimeoutMS:45000
})

export {client};

export interface BookingInterface {
    cinemaId:string,
    name: string;
    seats: number;
}