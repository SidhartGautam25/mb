import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import userRoute from "./routes/userRoutes.js"

const app = express();

app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("request is coming")
  console.log('IP:', req.ip);
  next(); 
});

app.use("/api/v1", userRoute);

app.use(errorMiddleware);

export default app;
