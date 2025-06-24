import express from "express";
import { roleBasedAccess, verifyUser } from "../middlewares/user.js";
import { createProduct } from "../controllers/product.js";


const router = express.Router();

router.route("/products").get()
// role based access is missing for now
router.route("/admin/product/create").post(verifyUser,createProduct);


export default router;
