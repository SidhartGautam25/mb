import mongoose from "mongoose";

export const mongoConnect = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  });
};
