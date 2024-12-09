import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrdersAdmin,
} from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();

orderRouter.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersAdmin
);

orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);

export default orderRouter;
