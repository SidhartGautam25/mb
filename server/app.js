import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", user);

export default app;
