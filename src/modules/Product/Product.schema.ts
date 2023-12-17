import { Schema } from "mongoose";

const ProductSchema = new Schema({
  Date: String,
  Product: String,
  FinalPrice: Number,
});

export default ProductSchema;
