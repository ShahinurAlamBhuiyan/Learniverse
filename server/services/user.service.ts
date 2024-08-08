import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async (id: any, res: Response) => {
  const userJSON = await redis.get(id);
  if (userJSON) {
    const user = JSON.parse(userJSON);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

// get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleServices = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};
