import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", user);

app.use(errorMiddleware);

export default app;
