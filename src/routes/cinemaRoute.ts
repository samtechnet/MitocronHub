import  express  from "express";
import cinemaController from "../controller/cinemaController";
import {CinemaValidatorMiddleware} from "../middleware/cinemaValidator";


const middleware= new CinemaValidatorMiddleware();
const cinemaRoute=async (app:express.Application)=>{
    /**
     * @swagger
     * /cinema:
     *   tags:
     *     - name: Cinema
     *       description: Operations related to cinemas
     *   get:
     *     summary: Get all created cinemas
     *     tags:
     *       - Cinema
     *
     *     responses:
     *       200:
     *         description: Successfully processed
     */


    app.get("/cinema", cinemaController.getAllCinema )
    /**
     * @openapi
     * /cinema:
     *   post:
     *     summary: Create a cinema
     *     description: Create a new cinema
     *     tags:
     *       - Cinema
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               firstName:
     *                 type: string
     *               lastName:
     *                 type: string
     *               capacity:
     *                 type: integer
     *                 format: int32
     *               availableSeats:
     *                 type: integer
     *                 format: int32
     *     responses:
     *       200:
     *         description: Successfully created
     */


    app.post("/cinema",middleware.registrationValidator, cinemaController.create)
}


export default cinemaRoute;