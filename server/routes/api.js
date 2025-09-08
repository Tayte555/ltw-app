import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const apiKey = process.env.API_KEY;
const baseURL = process.env.BASE_URL;

router.get("/pl-results", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/competitions/PL/matches`, {
      headers: { "X-Auth-Token": apiKey },
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

export default router;
