const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// ✅ Get all users (Only Admin)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete user
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    console.log("Deleting user with ID:", req.params.id); // 👈 Debug log
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err); // 👈 Debug log
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ Change role
router.put("/users/:id/role", protect, adminOnly, async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
