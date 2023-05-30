import * as dotenv from "dotenv";
import AppError from "./service/errorHandler/error"
import {app, } from "./config/app";
import {client} from "./config/databaseConfig";

dotenv.config();

const PORT= process.env.PORT || 3000;


app.listen(PORT,async () => {
    try {
        await client.connect();
        const connection = await client.db("test").command({ ping: 1 });
        console.log(connection)
      console.log (`Server started on port: ${PORT}`);

    } catch (error) {
        //logger.warn(`unable to connect with error ${error}`)
        console.log (`Server is unable to start with error : ${error}`)
        throw new AppError(`Unable to connect with error ${error}`, 500)
    }
});
