import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import productRoute from "./routes/product.routes";
import authRoute from "./routes/auth.routes";
import ErrorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
//middleware
app.use(ErrorMiddleware);

export default app;
