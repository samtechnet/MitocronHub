import express,{NextFunction, Request,Response, Application, application} from "express";
import AppError from "../service/errorHandler/error"
import * as dotenv from "dotenv";
import bodyParser, { json, urlencoded } from "body-parser";
import cinemaRoutes from "../routes/cinemaRoute";
import { errorController } from "../middleware/errorHandler";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
import cinemaRoute from "../routes/cinemaRoute";
import bookingRoute from "../routes/bookingRoute";
const app:express.Application= express();
dotenv.config()

const PORT= process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(urlencoded({extended:true}));
cinemaRoute(app);
bookingRoute(app);



const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"MitocronHub doc",
            version:"0.1",
            contact:{
                name:"samuel Omolaja",
                url:"https://samuelomolaja.com.ng",
                email:"samlaja1292@gmail.com"
            },
        },

        servers:[
            {
                url:`http://localhost:${PORT}`
            }
        ]
    },
    apis:[ './src/*.ts', './src/routes/*.ts']
}
const spacs=swaggerjsdoc(options);
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))



app.all('*', ( req:Request, res:Response, next:NextFunction) => {

    next(new AppError(`Requested URL ${req.path} not found!, `, 404));
});
app.use(errorController);

export {app};