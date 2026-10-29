const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ ALLOW FRONTEND ORIGIN
app.use(cors({
  origin: "http://localhost:5173",   // Your frontend address
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle Preflight requests for all routes
app.use(cors());


app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

// ✅ CONNECT TO MONGO
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travelDB")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.error("DB error:", err));
