const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOGIN route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Email ने user शोध
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found. Please sign up." });
    }

    // 2️⃣ Password compare करा (bcrypt वापरून)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // 3️⃣ JWT token तयार करा
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Response पाठवा
    res.json({ success: true, token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// REGISTER route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1️⃣ रिकामं check करा
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2️⃣ Email format check करा
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // 3️⃣ Password length check
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // 4️⃣ User आधीच आहे का check करा
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // 5️⃣ Password hash करा
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6️⃣ User तयार करा
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// UPDATE user
router.put("/user/:id", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("🔁 PUT /user/:id CALLED");
  console.log("🧾 req.params.id:", req.params.id);
  console.log("📦 req.body:", req.body);

  try {
    const updateFields = { name, email };

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    console.log("✅ Updated User:", updatedUser);

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
});


module.exports = router;
