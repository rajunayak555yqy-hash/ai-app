let orders = [];
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));


const menu = [
  { name: "Burger", price: 50 },
  { name: "Pizza", price: 120 },
  { name: "Sandwich", price: 40 },
  { name: "Coffee", price: 30 }
];

app.get("/", (req, res) => {
  res.send("AI Canteen Server is Running");
});
app.post("/order", (req, res) => {

  const {
    item,
    delivery,
    username
  } = req.body;

  let total = item.price;

  if (delivery) {
    total += 10;
  }

  const token =
    Math.floor(Math.random() * 1000);

  const orderData = {
    username,
    item: item.name,
    total,
    token
  };

  orders.push(orderData);

  res.json({
    success: true,
    message: "Order placed successfully",
    token,
    total
  });

});
app.get("/admin-orders", (req, res) => {

  res.json(orders);

});
app.post("/ai", (req, res) => {

  const { message } = req.body;

  let reply = "";

  if (
    message.toLowerCase().includes("healthy")
  ) {
    reply =
      "Try sandwich and juice combo.";
  }

  else if (
    message.toLowerCase().includes("study")
  ) {
    reply =
      "Coffee and burger combo is good.";
  }

  else {
    reply =
      "Try pizza and cold coffee.";
  }

  res.json({
    reply: reply
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
