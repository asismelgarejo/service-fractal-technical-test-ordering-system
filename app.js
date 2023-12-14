const serverless = require("serverless-http");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const MOCK_ORDERS = require("./mocks/MOCK_ORDERS");
const MOCK_PRODUCTS = require("./mocks/MOCK_PRODUCTS");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const connectionString =
  "mongodb+srv://asis:root@cluster0.bglb8.mongodb.net/asis-landing-page";
// Mongoose connection
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// const allowedRoutes = [
//   "https://fractal-technical-test-ordering-system.vercel.app/",
//   "http://localhost:3000/",
// ];
// // Configure CORS middleware with allowed routes
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedRoutes.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send({
    data: MOCK_ORDERS,
    status: 200,
    message: "success",
  });
});
app.get("/orders", (req, res) => {
  res.send({
    data: MOCK_ORDERS,
    status: 200,
    message: "success",
  });
});

app.get("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID in the database
    const order = MOCK_ORDERS.find((o) => o.ID === orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Return the order as JSON response
    res.status(200).json({
      data: order,
      status: 200,
      message: "success",
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/orders", (req, res) => {
  const newOrder = req.body;

  // Validate the order (replace with your validation logic)
  if (
    !newOrder ||
    !newOrder.ID ||
    !newOrder.Order ||
    !newOrder.Date ||
    !newOrder.Products ||
    !newOrder.FinalPrice
  ) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request. Order data is incomplete.",
    });
  }

  // Add the new order to the mock data (replace with your database logic)
  MOCK_ORDERS.push(newOrder);

  res.status(201).json({
    data: newOrder,
    status: 201,
    message: "Order created successfully.",
  });
});

app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;

  // Find the order by ID (replace with your database logic)
  const existingOrderIndex = MOCK_ORDERS.findIndex(
    (order) => order.ID === orderId
  );

  if (existingOrderIndex === -1) {
    return res.status(404).json({
      status: 404,
      message: "Order not found.",
    });
  }

  // Update the existing order (replace with your database logic)
  MOCK_ORDERS[existingOrderIndex] = {
    ...MOCK_ORDERS[existingOrderIndex],
    ...updatedOrderData,
  };

  res.status(200).json({
    data: MOCK_ORDERS[existingOrderIndex],
    status: 200,
    message: "Order updated successfully.",
  });
});

app.get("/products", (req, res) => {
  res.send({
    data: MOCK_PRODUCTS,
  });
});
app.listen(4000, () => console.log(`Listening on: 4000`));
// module.exports.handler = serverless(app);
