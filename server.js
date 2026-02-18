const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/create-order", async (req, res) => {
  try {
    const orderId = "order_" + Date.now();

    const response = await axios.post(
      "https://api.cashfree.com/pg/orders",
      {
        order_id: orderId,
        order_amount: req.body.amount,
        order_currency: "INR",
        customer_details: {
          customer_id: "test123",
          customer_name: req.body.name || "Test",
          customer_email: req.body.email || "test@test.com",
          customer_phone: req.body.phone || "9999999999",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET,
          "x-api-version": "2023-08-01",
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(10000, () => console.log("Server running on port 10000"));
