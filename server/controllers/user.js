import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import { sendToken } from "../utils/jwt.js";

export const registerUser = handleAsyncError(async (req, res, next) => {
  console.log("user is trying to register ",req.body);
  const { name, email, password } = req.body;
  console.log("name is ",name," email is ",email," password is ",password);
  console.log("trying to create user");
  const user = await User.create({
    name,
    email,
    password,
  });
  console.log("user created");
  // sendToken(user, 201, res);
   res.status(201).json({
    success: true,
    user
  });
});

export const Login = handleAsyncError(async (req, res, next) => {
  console.log("req body is ",req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or passoword cannot be empty", 400));
  }
  console.log("trying to get user ");
  const user = await User.findOne({ email }).select("+password");
  console.log("user is ",user);
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isValid = user.verifyPassword(password);
  if (!isValid) {
    return next(new HandleError("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

export const logout = handleAsyncError(async (req, res, next) => {
  console.log("trying to logout user");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  console.log("successfull")
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});
