import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwt.js";

export const registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

export const Login = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or passoword cannot be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isValid = await user.verifyPassword(password);
  if (!isValid) {
    return next(new HandleError("Invalid Email or password", 401));
  }
  sendToken(user, 200, res);
});

export const logout = handleAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});
