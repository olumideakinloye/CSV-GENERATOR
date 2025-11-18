const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/user");
const app = express();

dotenv.config();

//connnect to database
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
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
    return res.json({
      state: "Existing",
      message: "You are a registered user.",
    });
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

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

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
    const list = await User.find().sort({ createdAt: 1 }).limit(100);
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    console.error("Error fetching documents:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/downloaded-users", async (req, res) => {
  try {
    const users = await User.countDocuments({ isDownloaded: true }).limit(100);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/registered-users", async (req, res) => {
  try {
    const list = await User.countDocuments().limit(20);
    res.status(200).json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.patch("/setRef", async (req, res) => {
  try {
    const { ref, phone } = req.body;

    // Find & update
    const updatedUser = await User.findOneAndUpdate(
      { phone: phone },
      { $set: { paymentRefrence: ref } },
      { new: true, runValidators: true } // return updated document & validate against schema
    );

    // Handle case where no user is found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back success
    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error updating" });
  }
});

app.patch("/set-download-state", async (req, res) => {
  try {
    const { phone } = req.body;

    // Find & update
    const updatedUser = await User.findOneAndUpdate(
      { phone: phone },
      { $set: { isDownloaded: true } },
      { new: true, runValidators: true } // return updated document & validate against schema
    );

    // Handle case where no user is found
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back success
    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Update error:", error);
    res.json({ error: "Internal server error" });
  }
});

app.get("/files/Untitled.png", async (req, res) => {
  const filePath = path.join(__dirname, "files", "Untitled.png");
  res.download(filePath, "Untitled.png");
});
