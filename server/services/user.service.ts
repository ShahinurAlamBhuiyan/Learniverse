// get user by id

import { Response } from "express";
import userModel from "../models/user.model"

export const getUserById = async (id: any, res: Response) => {
    const user = await userModel.findById(id.toString());

    res.status(201).json({
        success: true,
        user
    })
}