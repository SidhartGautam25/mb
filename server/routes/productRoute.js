import express from "express";
import { roleBasedAccess, verifyUser } from "../middlewares/user";
import { createProduct } from "../controllers/product";


const router = express.Router();

router.route("/admin/product/create").post(verifyUser,roleBasedAccess("admin"),createProduct);


export default router;
