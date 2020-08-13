const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./Models/product");

mongoose.connect("mongodb://localhost:27017/node-api-101", {
  useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB error", err);
});

app.use(express.json());

const products = [{}];

app.post("/products", async (req, res) => {
  const payload = req.body;
  const product = new Product(payload);
  await product.save();
  res.status(201).end();
});

// app.get("/products/:id", async (req, res) => {
//   const { id } = req.params;
//   const product = await Product.findById(id);
//   res.json(product);
// });
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

app.put("/products/:id", async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { $set: payload });
    res.json(product);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
});

// const Cat = mongoose.model("Cat", { name: String });

// const Kitty = new Cat({ name: "JavaScript" });

// Kitty.save().then(() => console.log("meow"));
// const products = [
//   {
//     id: "1001",
//     name: "Node.js for Beginner",
//     category: "Node",
//     price: 900,
//   },
//   {
//     id: "1002",
//     name: "React 101",
//     category: "React",
//     price: 3990,
//   },
//   {
//     id: "1003",
//     name: "Getting started with MongoDB",
//     category: "MongoDB",
//     price: 1990,
//   },
// ];

// app.get("/products", (req, res) => {
//   res.json(products);
// });

// app.get("/products/:id", (req, res) => {
//   const { id } = req.params;
//   const result = products.find((product) => product.id === id);
//   res.json(result);
// });

// app.post("/products", (req, res) => {
//   const payload = req.body;
//   res.json(payload);
// });

// app.put("/products/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({ id });
// });

// app.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({ id });
// });

// app.get("/hello/:message", (req, res) => {
//   const { params } = req;
//   res.json({ message: "Mean Jaaa", params });
// });

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
