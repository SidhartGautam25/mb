import handleAsyncError from "../middlewares/handleAsyncError.js";
import Product from "../models/Product.js";
import { APIFunctionality } from "../utils/apiFunctionality.js";
import { getCat } from "../utils/categories.js";

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

export const getProducts=handleAsyncError(async (req,res,next)=>{
  const count=10;
  console.log("trying to fetch products");
  console.log("req.query is ",req.query);
  const cat=getCat(Number(req.query.category));
  const queryStr=req.query;
  console.log("cat is ",cat);
  req.query.category=cat;
  queryStr.category=cat;
  console.log("queryStr is ",queryStr);
  const apiFeatures=new APIFunctionality(Product.find(),queryStr).search().filter();
  
  //  getting filtered query
  console.log("step 1 is done");
  const filteredQuery=apiFeatures.query.clone();
  const productCount=await filteredQuery.countDocuments();

  // calculating total pages according to total products
  console.log("reached here 2");
  const totalPages=Math.ceil(productCount/count);
  const page=Number(req.query.page) || 1;
  
  console.log("reached here 3");
  if(page > totalPages && productCount > 0){
     return next(new HandleError("this page does not exist"));
  }

  console.log("reached here 4");
  // applying pagination
  apiFeatures.pagination(count);
  const products= await apiFeatures.query;
  console.log("products are ",products);

  if(!products || products.count === 0 ){
    return next(HandleError("no product found",404));
  }

  console.log("reached here 5");
  res.status(200).json({
    success:true,
    products,
    productCount,
    resultPerPage:count,
    totalPages,
    currentPage:page
  })

})



export const getProduct=handleAsyncError(async (req,res,next)=>{
  const product=await Product.findById(req.params.id);
  if(!product){
    return next(new HandleError("Product Not Found",404));
  }
  res.status(200).json({
    success:true,
    product
  })
})