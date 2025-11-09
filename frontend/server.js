const express = require("express");
const app = express();
app.use(express.json());

const PAYSTACK_SECRET_KEY = "sk_test_xxxxxxxxxxxxx";

app.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  try {
    // Verify payment with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status && data.data.status === "success") {
      // Payment verified 
      res.json({ success: true, downloadUrl: "/files/Untitled.png" });
    } else {
      res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Serve the file securely
app.get("/files/Untitled.png", (req, res) => {
  // Here you can add authentication or token checks if needed
  const filePath = __dirname + "/files/Untitled.png";
  res.download(filePath, "Untitled.png");
});

app.listen(5000, () => console.log("Server running on port 5000"));
