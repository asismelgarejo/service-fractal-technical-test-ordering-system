const mongoose = require("mongoose");

// Schemas
const ProductSchema = new mongoose.Schema({
  ID: String,
  Name: String,
  UnitPrice: Number,
});

const Product = mongoose.model("Product", ProductSchema);

const ProductOrderSchema = new mongoose.Schema({
  Product: ProductSchema,
  Qty: Number,
  TotalPrice: Number,
});

module.exports = {
  ProductOrderSchema,
  Product,
};
