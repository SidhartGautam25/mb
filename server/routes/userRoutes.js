import express from "express";
import {addToCart, getCartItems, Login, logout, registerUser} from "../controllers/user.js"; 
import { verifyUser } from "../middlewares/user.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/addToCart").post(verifyUser, addToCart);
router.route("/loadCart").get(verifyUser,getCartItems);
router.route("/logout").post(logout);



export default router;
