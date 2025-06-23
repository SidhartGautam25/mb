import handleAsyncError from "../middlewares/handleAsyncError.js";
import Product from "../models/Product.js";

export const createProduct=handleAsyncError(async(req,res,next)=>{
  console.log("trying to create product")
  console.log("body is ",req.body);
    // let image=[];
    // if(typeof req.body.image==="string"){
    //     image.push(req.body.image);
    // }else{
    //     image=req.body.image;
    // }
    // const imageLinks=[];
    // for (let i = 0; i < image.length; i++) {
    // const result = await cloudinary.uploader.upload(image[i], {
    //   folder: "products",
    // });
    // imageLinks.push({
    //   public_id: result.public_id,
    //   url: result.secure_url,
    // });
    // };
    // console.log("image links are ",imageLinks);
    // req.body.image=imageLinks;
    req.body.user=req.user.id;
    console.log("creating product");
    const product=await Product.create(req.body);
    console.log("product created")
    res.status(201).json({
        success:true,
        product
    })


})