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
  const { username, email, password, firstName, lastName } = req.body;
  if (!email || !password || !username || !firstName || !lastName)
    return res.status(400).json({ message: "Missing fields" });

  try {
    const existingEmail = await users.findOne({ email });
    const existingUsername = await users.findOne({ username });
    if (existingEmail)
      return res.status(400).json({ message: "Email already in use" });
    if (existingUsername)
      return res.status(400).json({ message: "User already exists" });

    //Create Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
