import express from "express";
import { roleBasedAccess, verifyUser } from "../middlewares/user.js";
import { createProduct, getProducts } from "../controllers/product.js";


const router = express.Router();

router.route("/products").get(getProducts)
// role based access is missing for now
router.route("/admin/product/create").post(verifyUser,createProduct);


export default router;
