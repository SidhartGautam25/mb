import handleAsyncError from "../middlewares/handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
// import { sendToken } from "../utils/jwt.js";
import { sendToken } from "../utils/jwt_2.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt_2.js";
import {
  findCartItem,
  getUser,
  updateCartItemQuantity,
} from "../utils/userUtility.js";

export const refreshToken = handleAsyncError(async (req, res, next) => {
  console.log("you are in refresh token controller");
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return next(new HandleError("Refresh Token not found ", 401));
  }
  const decodedData = verifyRefreshToken(refreshToken);
  const user = await User.findById(decodedData.id);

  if (!user) {
    return next(new HandleError("User not found", 404));
  }

  const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
    generateTokens(user);

  const accessTokenOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_ACCESS_COOKIE_EXPIRE || 15) * 60 * 1000
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
  };

  const refreshTokenOptions = {
    expires: new Date(
      Date.now() +
        (process.env.JWT_REFRESH_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
  };

  res
    .status(200)
    .cookie("accessToken", newAccessToken, accessTokenOptions)
    .cookie("refreshToken", newRefreshToken, refreshTokenOptions)
    .json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
});

export const registerUser = handleAsyncError(async (req, res, next) => {
  console.log("user is trying to register ", req.body);
  const { name, email, password } = req.body;
  console.log("name is ", name, " email is ", email, " password is ", password);
  console.log("trying to create user");
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 200, res);
  
});

export const Login = handleAsyncError(async (req, res, next) => {
  console.log("req body is ", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or passoword cannot be empty", 400));
  }
  console.log("trying to get user ");
  const user = await User.findOne({ email }).select("+password");
  console.log("user is ", user);
  if (!user) {
    return next(new HandleError("Invalid email or password", 401));
  }
  const isValid = await user.verifyPassword(password);
  if (!isValid) {
    return next(new HandleError("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

export const logout = handleAsyncError(async (req, res, next) => {
  console.log("trying to logout user");
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("refreshToken",null,{
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  console.log("successfull");
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});

export const addToCart = handleAsyncError(async (req, res, next) => {
  console.log("trying to add product to cart ", req.body);
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required",
    });
  }

  if (parseInt(quantity) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be greater than 0",
    });
  }
  console.log("trying to get user by userId ", userId);
  // const user = await User.findById(userId);

  const user = await getUser(userId);

  console.log("user is ", user);

  // const productExists = user.cart.find(
  //   (item) => item?.productId?.toString() === productId?.toString()
  // );
  const existingItem = await findCartItem(user.cart, productId);
  console.log("existing item is ", existingItem);
  console.log("you are here 1");
  // if (productExists) {
  //   console.log("you are here 2");
  //   user.cart.forEach((item) => {
  //     if (item.productId?.toString === productId?.toString()) {
  //       item.quantity = quantity;
  //     }
  //   });
  // } else {
  //   user.cart.push({
  //     productId,
  //     quantity,
  //   });
  // }
  if (existingItem) {
    console.log("you are at existing item");
    updateCartItemQuantity(user.cart, productId, quantity);
    console.log("user is ", user);
  } else {
    console.log("this is new item to cart ", user);
    user.cart.push({
      productId,
      quantity,
    });
    console.log("after pushing item to cart ", user);
  }
  console.log("user is ", user);
  console.log("trying to save to the database");
  await user.save({ validateBeforeSave: false });
  console.log("successfully done");
  res.status(200).json({
    success: true,
    productId,
    quantity,
    message: existingItem ? "Cart Item quantity updated" : "item added to cart",
  });
});

// export const getCartItems = handleAsyncError(async (req, res, next) => {
//   console.log("getting cart items controller ")
//   const userId = req.user._id;
//   const user = await User.findById(userId).populate('cart.productId', 'name price images');

//   if (!user) {
//     return next(new HandleError("User not found", 404));
//   }

//   console.log("you are here");
//   console.log("seeing the item 0 ",user.cart);
//   const cartItems = user.cart.map(item => ({
//     id: item.productId._id.toString(),
//     name: item.productId.name,
//     price: item.productId.price,
//     image: item.productId.image,
//     quantity: item.quantity
//   }));

//   console.log("cart items is ",cartItems);

//   res.status(200).json({
//     success: true,
//     cartItems
//   });
// });

// with aggregation
export const getCartItems = handleAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  console.log("req.user is ", req.user);
  const result = await User.getCartWithProducts(userId);

  if (!result) {
    return next(new HandleError("User Not Found ", 404));
  }
  // console.log("result is ",result[0].cart);
  const user = result[0];
  const cart = user.cart;
  console.log("cart is ", cart);
  const cartItems = cart.map((item) => ({
    id: item.productId.toString(),
    name: item.product.name,
    price: item.product.price,
    image: item.product.image,
    quantity: item.quantity,
  }));
  res.status(200).json({
    success: true,
    cartItems,
  });
});
