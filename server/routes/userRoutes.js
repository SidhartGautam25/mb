import express from "express";
import { registerUser } from "../controllers/user";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/logout");
