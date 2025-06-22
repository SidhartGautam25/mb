import HandleError from "../utils/handleError";
import handleAsyncError from "./handleAsyncError";
import jwt from "jsonwebtoken";

export const verifyUser=handleAsyncError(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new HandleError("not authenticated,please login to access resources",401));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SEC_KEY);
    console.log("decoded data is ",decodedData);
    req.user=await User.findById(decodedData.id);
    next();
})

export const roleBasedAccess=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resources `,403));
        }
        next();
    }
}