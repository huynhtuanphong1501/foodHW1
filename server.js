import express from "express";
import { PORT } from "./src/common/constants/app.constant.js";
import { logAPI } from "./src/common/middlewares/log-api.middleware.js";
import rootRouter from "./src/routers/root.router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(logAPI);
app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
