import express from "express";
import { likeController } from "../controllers/like.controller.js";
import { authCookie } from "../common/middlewares/authCookie.middleware.js";

const likeRouter = express.Router();

// Tạo route CRUD
likeRouter.post("/", authCookie, likeController.likeRes);
likeRouter.delete("/:resId", authCookie, likeController.unlikeRes);
likeRouter.get("/restaurant/:resId", authCookie, likeController.getLikebyRes);
likeRouter.get("/user/:userId", authCookie, likeController.getLikebyUser);

export default likeRouter;
