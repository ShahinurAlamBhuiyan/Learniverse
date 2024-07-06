// get user by id

import { Response } from "express";
import userModel from "../models/user.model"
import { redis } from "../utils/redis";

export const getUserById = async (id: any, res: Response) => {
    const userJSON = await redis.get(id);
    if(userJSON){
        const user = JSON.parse(userJSON)
        res.status(201).json({
            success: true,
            user
        })
    }
}