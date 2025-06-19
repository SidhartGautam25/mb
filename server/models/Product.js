import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [7, "Price cannot exceed 7 digits"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
  discount: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [5, "Price cannot exceed 5 digits"],
    default: 100,
  },
});

export default mongoose.model("Product", productSchema);
