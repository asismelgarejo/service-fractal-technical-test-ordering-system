const mongoose = require("mongoose");
const { ProductOrderSchema } = require("../product/product.schema");

const OrderSchema = new mongoose.Schema({
  ID: String,
  Order: String,
  Date: Date,
  Products: [ProductOrderSchema],
  FinalPrice: Number,
});

const Order = mongoose.model("Order", OrderSchema);

// Create an order
app.post("/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read one order by ID
app.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an order by ID
app.put("/orders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedOrder) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an order by ID
app.delete("/orders/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
