import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {},
    email: {},
    password: {},
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.methods.verifyPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

export default mongoose.model("User", userSchema);
