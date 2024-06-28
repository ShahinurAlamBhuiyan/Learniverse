import express, { NextFunction, Request, Response } from 'express'
export const app = express();
import cors from 'cors'
import cookieParser from 'cookie-parser';
require('dotenv').config();


// body parser
app.use(express.json({limit: '50mb'}));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN
}));


// testing api

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "API is working",
    });
});


// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} is not found`) as any;
    next(err);
});