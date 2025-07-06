import express from "express";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./db.js";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

connectDB();

app.listen(5555, () => {
  console.log("[WSO] Server connected on port 5555");
});
