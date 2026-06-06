import express from "express";
import authRouter from "./auth.router.js";
import likeRouter from "./like.router.js";
import rateRouter from "./rate.router.js";
import orderRouter from "./order.router.js";

const rootRouter = express.Router();

// Tạo route CRUD
rootRouter.use("/auth", authRouter);
rootRouter.use("/like", likeRouter);
rootRouter.use("/rate", rateRouter);
rootRouter.use("/order", orderRouter);

export default rootRouter;
