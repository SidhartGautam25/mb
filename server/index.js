import app from "./app.js";
import { mongoConnect } from "./config/mongo.js";
import mongoose from "mongoose";

mongoConnect();
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down due to uncaught exception errors`);
  process.exit(1);
});

const port = process.env.PORT || 8800;
const server = app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Server is shutting down, due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
