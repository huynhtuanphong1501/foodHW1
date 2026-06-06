import express from "express";
import { orderController } from "../controllers/order.controller.js";
import { authCookie } from "../common/middlewares/authCookie.middleware.js";
const orderRouter = express.Router();

// Tạo route CRUD
orderRouter.post("/", authCookie, orderController.create);

export default orderRouter;
