import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';


export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';


    // wrong mongodb ID
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key Error
    if(err.code === 1100){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400);
    }


    // Wrong jwt error
    if(err.name === 'JsonWebTokenError'){
        const message = `Json web token is invalid. try again`;
        err = new ErrorHandler(message, 400);
    }

    // Jwt expire error
    if(err.name === 'TokenExpireError'){
        const message = `Json web token is expired. try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.StatusCode).json({
        success: false,
        message: err.message
    });
}