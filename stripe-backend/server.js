// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes (you can configure this more strictly if needed)
app.use(cors());
app.use(express.json());

// Endpoint to simulate PaymentIntent creation
app.post("/create-payment-intent", (req, res) => {
  const { amount } = req.body; // amount in cents
  const clientSecret = "client_secret_" + amount + "_" + Date.now();
  console.log(`PaymentIntent for amount: ${amount}`);
  res.json({ clientSecret });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Stripe backend server is running on port ${PORT}`);
});
