import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.js";
import userRoute from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://snapbharat.com",
      "http://cliftkart.com",
      
    ],
    credentials: true,
  })
);
dotenv.config();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("request is coming");
  console.log("request body is ", req.body);
  console.log("IP:", req.ip);
  console.log("Request Headers:", req.headers);
  if (req.method === "OPTIONS") {
    console.log("Preflight request received");
  }
  next();
});

app.use("/api/v1", userRoute);
app.use("/api/v1", productRoutes);

app.use(errorMiddleware);

export default app;
