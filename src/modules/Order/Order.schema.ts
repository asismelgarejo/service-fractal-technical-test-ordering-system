import { Schema } from "mongoose";

const OrderSchema = new Schema({
  Date: String,
  Order: String,
  FinalPrice: Number,
});

export default OrderSchema;
