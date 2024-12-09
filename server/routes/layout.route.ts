import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";

const layoutRouter = express.Router();

layoutRouter.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/update-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateLayout
);

layoutRouter.get("/get-layout", getLayoutByType);

export default layoutRouter;
