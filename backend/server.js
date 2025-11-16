const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user")
const app = express();
//connnect to database
const dbURI =
  "mongodb+srv://balalaika_tv:ak47_Nigeria@cluster0.zekxu4n.mongodb.net/balalikaTv?appName=Cluster0";
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

app.post('/register', (req, res)=>{
  const user = new User(JSON.parse(req))
})

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

app.get("/files/Untitled.png", (req, res) => {
  const filePath = path.join(__dirname, "files", "Untitled.png");
  res.download(filePath, "Untitled.png");
});
