import express from "express";
import {addAddress, addPhone, addToCart, getCartItems, Login, logout, refreshToken, registerUser} from "../controllers/user.js"; 
// import { verifyUser } from "../middlewares/user.js";
import { verifyUser } from "../middlewares/user_2.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/refresh-token").post(refreshToken);
router.route("/addToCart").post(verifyUser, addToCart);
router.route("/loadCart").get(verifyUser,getCartItems);
router.route("/addAddress").post(verifyUser,addAddress);
router.route("/addPhone").post(verifyUser,addPhone);
router.route("/logout").post(logout);



export default router;
