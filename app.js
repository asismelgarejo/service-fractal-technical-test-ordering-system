const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

let orders = [];
let products = [
  {
    ID: "1",
    Name: "Bread",
    UnitPrice: 2.99,
  },
  {
    ID: "2",
    Name: "Milk",
    UnitPrice: 1.99,
  },
  {
    ID: "3",
    Name: "Eggs",
    UnitPrice: 2.49,
  },
  {
    ID: "4",
    Name: "Rice",
    UnitPrice: 3.99,
  },
  {
    ID: "5",
    Name: "Water",
    UnitPrice: 0.99,
  },
  {
    ID: "6",
    Name: "Toilet Paper",
    UnitPrice: 4.49,
  },
  {
    ID: "7",
    Name: "Soap",
    UnitPrice: 1.79,
  },
  {
    ID: "8",
    Name: "Canned Beans",
    UnitPrice: 1.29,
  },
  {
    ID: "9",
    Name: "Diapers",
    UnitPrice: 8.99,
  },
  {
    ID: "10",
    Name: "Salt",
    UnitPrice: 0.79,
  },
];

// Dummy data for initialization
const initialOrders = [];

const initialProducts = [
  {
    ID: "1",
    Name: "Bread",
    UnitPrice: 2.99,
  },
  {
    ID: "2",
    Name: "Milk",
    UnitPrice: 1.99,
  },
  {
    ID: "3",
    Name: "Eggs",
    UnitPrice: 2.49,
  },
  {
    ID: "4",
    Name: "Rice",
    UnitPrice: 3.99,
  },
  {
    ID: "5",
    Name: "Water",
    UnitPrice: 0.99,
  },
  {
    ID: "6",
    Name: "Toilet Paper",
    UnitPrice: 4.49,
  },
  {
    ID: "7",
    Name: "Soap",
    UnitPrice: 1.79,
  },
  {
    ID: "8",
    Name: "Canned Beans",
    UnitPrice: 1.29,
  },
  {
    ID: "9",
    Name: "Diapers",
    UnitPrice: 8.99,
  },
  {
    ID: "10",
    Name: "Salt",
    UnitPrice: 0.79,
  },
];

// Initialize orders and products
orders = [...initialOrders];
products = [...initialProducts];
app.get("/", (req, res) => {
  res.status(200).json({
    data: "Fractal service",
    status: 200,
    message: "success",
  });
});

app.get("/orders", (req, res) => {
  res.status(200).json({
    data: orders,
    status: 200,
    message: "success",
  });
});

app.get("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const order = orders.find((o) => o.ID === orderId);

  if (!order) {
    res.status(404).json({ error: "Order not found" });
  } else {
    res.status(200).json({
      data: order,
      status: 200,
      message: "success",
    });
  }
});

app.post("/orders", (req, res) => {
  const order = req.body;

  if (
    !order ||
    !order.Order ||
    !order.Date ||
    !order.Products ||
    !order.FinalPrice
  ) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request. Order data is incomplete.",
    });
  }


  if(orders.map((o) => o.Order).includes(order.Order)){
    return res.status(400).json({
      status: 400,
      message: "Bad Request. The order code has already been taken.",
    });
  }

  order.ID = (orders.length+1).toString();
  orders.push(order);
  res.status(201).json({
    data: order,
    status: 201,
    message: "Order created successfully.",
  });
});

app.put("/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const updatedOrderData = req.body;

  const existingOrderIndex = orders.findIndex((order) => order.ID === orderId);

  if (existingOrderIndex === -1) {
    res.status(404).json({
      status: 404,
      message: "Order not found.",
    });
  } else {
    orders[existingOrderIndex] = updatedOrderData;
    res.status(200).json({
      data: orders[existingOrderIndex],
      status: 200,
      message: "Order updated successfully.",
    });
  }
});
app.delete("/orders/:id", (req, res) => {
  const orderId = req.params.id;

  const existingOrderIndex = orders.findIndex((order) => order.ID === orderId);

  if (existingOrderIndex === -1) {
    res.status(404).json({
      status: 404,
      message: "Order not found.",
    });
  } else {
    orders = orders.filter((order) => order.ID !== orderId);
    res.status(200).json({
      data: orderId,
      status: 200,
      message: "Order deleted successfully.",
    });
  }
});

app.get("/products", (req, res) => {
  res.status(200).json({
    data: products,
    status: 200,
    message: "success",
  });
});

// app.listen(4000, () => console.log(`Listening on: 4000`));
module.exports.handler = serverless(app);
