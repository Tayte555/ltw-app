import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { client } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const db = client.db(process.env.DB_NAME);
const users = db.collection("Users");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userId = new ObjectId(req.user.id);
    const user = await users.findOne(
      { _id: userId },
      { projection: { password: 0 } }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
