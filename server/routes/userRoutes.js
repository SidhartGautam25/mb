import express from "express";
import {Login, logout, registerUser} from "../controllers/user.js"; 

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(Login);
router.route("/logout").post(logout);



export default router;
