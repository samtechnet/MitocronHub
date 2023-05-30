import express,{NextFunction, Request,Response, Application, application} from "express";
import AppError from "../service/errorHandler/error"
import * as dotenv from "dotenv";
import bodyParser, { json, urlencoded } from "body-parser";
//import user_routes from "../routes/usersRoutes";
import { errorController } from "../middleware/errorHandler";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";
const app:express.Application= express();
dotenv.config()

const PORT= process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(urlencoded({extended:true}));
//user_routes(app);


const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"MitocronHub doc",
            version:"0.1",
            contact:{
                name:"samuel Omolaja",
                url:"samuelomolaja.com.ng",
                email:"samlaja1292@gmail.com"
            },
        },

        servers:[
            {
                url:`http://localhost:${PORT}`
            }
        ]
    },
    apis:["../routes/*.ts"]
}
const spacs=swaggerjsdoc(options);
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))

app.all('*', ( req:Request, res:Response, next:NextFunction) => {

    next(new AppError(`Requested URL ${req.path} not found!, `, 404));
});
app.use(errorController);

export {app};