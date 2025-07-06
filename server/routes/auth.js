import express from "express";
import bcrypt from "bcrypt";
import { client } from "../db.js";
import { generateToken } from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const db = client.db(process.env.DB_NAME);
const users = db.collection("Users");

// Registration Route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!email || !password || !username)
    return res.status(400).send("Missing fields");

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) return res.status(400).send("User already exists");

    //Create Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Missing email or password");

  try {
    const user = await users.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).send("Invalid credentials");

    const token = generateToken({ id: user._id, email: user.email });

    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
