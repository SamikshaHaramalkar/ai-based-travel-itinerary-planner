const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ ALLOW FRONTEND ORIGIN
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-based-travel-itinerary-planner.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


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
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  })
  .catch((err) => console.error("DB error:", err));
