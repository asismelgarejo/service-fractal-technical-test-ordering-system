import { Schema } from "mongoose";
import { OrderDTO } from "./dto/Order.dto";

const OrderSchema = new Schema({
  Date: String,
  Order: String,
  FinalPrice: Number,
});

export default OrderSchema;
