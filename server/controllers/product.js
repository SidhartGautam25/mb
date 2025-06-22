import handleAsyncError from "../middlewares/handleAsyncError";
import Product from "../models/Product";

export const createProduct=handleAsyncError(async(req,res,next)=>{
    let image=[];
    if(typeof req.body.image==="string"){
        image.push(req.body.image);
    }else{
        image=req.body.image;
    }
    const imageLinks=[];
    for (let i = 0; i < image.length; i++) {
    const result = await cloudinary.uploader.upload(image[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
    };
    req.body.image=imageLinks;
    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })


})