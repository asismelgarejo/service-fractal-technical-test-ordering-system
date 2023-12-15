const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const connectionString =
  "mongodb+srv://asis:root@cluster0.bglb8.mongodb.net/fractal-service";
(async () => {
  await mongoose.connect(connectionString);

  // const db = mongoose.connection;
  // db.on("error", console.error.bind(console, "MongoDB connection error:"));
  // db.once("open", () => {
  //   console.log("Connected to MongoDB");
  // });

  // // SCHEMAS
  // const ProductSchema = new mongoose.Schema({
  //   ID: String,
  //   Name: String,
  //   UnitPrice: Number,
  // });

  // const Product = mongoose.model("Product", ProductSchema);

  // const ProductOrderSchema = new mongoose.Schema({
  //   Product: ProductSchema,
  //   Qty: Number,
  //   TotalPrice: Number,
  // });

  // const OrderSchema = new mongoose.Schema({
  //   ID: String,
  //   Order: String,
  //   Date: Date,
  //   Products: [ProductOrderSchema],
  //   FinalPrice: Number,
  // });

  // const Order = mongoose.model("Order", OrderSchema);

  // app.get("/orders", async (req, res) => {
  //   try {
  //     const orders = await Order.find();
  //     res.status(200).json(orders);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.get("/orders/:id", async (req, res) => {
  //   try {
  //     const order = await Order.findById(req.params.id);
  //     if (!order) {
  //       res.status(404).json({ error: "Order not found" });
  //     } else {
  //       res.status(200).json(order);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.post("/orders", async (req, res) => {
  //   const order = req.body;
  //   try {
  //     if (
  //       !order ||
  //       !order.ID ||
  //       !order.Order ||
  //       !order.Date ||
  //       !order.Products ||
  //       !order.FinalPrice
  //     ) {
  //       return res.status(400).json({
  //         status: 400,
  //         message: "Bad Request. Order data is incomplete.",
  //       });
  //     }

  //     const newOrder = new Order(order);
  //     const savedOrder = await newOrder.save();
  //     res.status(201).json(savedOrder);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.put("/orders/:id", async (req, res) => {
  //   try {
  //     const updatedOrder = await Order.findByIdAndUpdate(
  //       req.params.id,
  //       req.body,
  //       {
  //         new: true,
  //       }
  //     );
  //     if (!updatedOrder) {
  //       res.status(404).json({ error: "Order not found" });
  //     } else {
  //       res.status(200).json(updatedOrder);
  //     }
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  // app.get("/products", async (req, res) => {
  //   try {
  //     const orders = await Product.find();
  //     res.status(200).json(orders);
  //   } catch (error) {
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });

  app.get("/", (req, res) => {
    res.send({
      data: "Fractal service",
      status: 200,
      message: "success",
    });
  });
})();
// app.listen(4000, () => console.log(`Listening on: 4000`));
module.exports.handler = serverless(app);
