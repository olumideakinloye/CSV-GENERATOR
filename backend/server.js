const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
//connnect to database
const dbURI =
  "mongodb+srv://balalaika_tv:ak47_Nigeria@cluster0.zekxu4n.mongodb.net/balalaikaTv?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(5000, () => console.log("Server running on port 5000"));
    console.log("connected to mongoDB");
  })
  .catch((err) => console.log(err));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.post("/register", async (req, res) => {
  const { name, email, phone, countryCode } = req.body;
  const existing = await User.findOne({ phone, countryCode });
  if (existing) {
    return res.status(400).json({ message: "You are a registered user." });
  }

  const user = new User({ name, email, phone, countryCode });
  user
    .save()
    .then((result) => {
      res.json({ success: true, message: "Successfully registered" });
    })
    .catch((err) => {
      console.log(err);
    });
});

const PAYSTACK_SECRET_KEY = "sk_test_933055feaa79fb4a7ad5369a71508a83b174688a";

app.post("/verify-payment", async (req, res) => {
  const { reference } = req.body;

  try {
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
      res.json({ success: true, downloadUrl: "/files/Untitled.png" });
    } else {
      res.status(400).json({ success: false, message: "Payment not verified" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/get-list", async (req, res) => {
  try {
    const list = await User.find().sort({ createdAt: 1 }).limit(20);
    res.status(200).json({success: true, data: list})
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }  
})

app.get("/files/Untitled.png", (req, res) => {
  const filePath = path.join(__dirname, "files", "Untitled.png");
  res.download(filePath, "Untitled.png");
});
