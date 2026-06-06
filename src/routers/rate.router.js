import express from "express";
import { rateController } from "../controllers/rate.controller.js";
import { authCookie } from "../common/middlewares/authCookie.middleware.js";

const rateRouter = express.Router();

// Tạo route CRUD
rateRouter.post("/", authCookie, rateController.addRate);
rateRouter.get("/restaurant/:resId", authCookie, rateController.getRateByRes);
rateRouter.get("/user/:userId", authCookie, rateController.getRateByUser);

export default rateRouter;
