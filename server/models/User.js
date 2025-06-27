import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type:String,
      required:true,
      unique:true,
    },
    email: {
      type:String,
      required:true,
      unique:true,
    },
    password: {
      type:String,
      required:true
    },
    phone:{
      type: String,
      default:"0000000000"
    },
    role: {
      type: String,
      default: "user",
    },
    cart:[{
        productId:{
          type:mongoose.Schema.ObjectId,
          ref:"Product",
          required:true

        },
        quantity:{
          type:String,
          default:"1",
          required:true
        }
    }],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);


userSchema.pre("save",async function(next){
  console.log("you are at pre of user scema");
  if(!this.isModified("password")){
    return next();
  }
  this.password=await bcrypt.hash(this.password,10);
  next();
})

userSchema.methods.getJwtToken=function(){
  console.log("generating token");
  return jwt.sign({id:this._id},process.env.JWT_SEC_KEY,{
    expiresIn:process.env.JWT_EXP
  })
}

userSchema.methods.verifyPassword = function (pass) {
  // return await bcrypt.compare(pass, this.password);
  if(pass===this.password){
    return true;
  }
  return false;
};

export default mongoose.model("User", userSchema);
