import express from "express";
import { roleBasedAccess, verifyUser } from "../middlewares/user.js";
import { createProduct, getProduct, getProducts } from "../controllers/product.js";


const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
// role based access is missing for now
router.route("/admin/product/create").post(verifyUser,createProduct);


export default router;
