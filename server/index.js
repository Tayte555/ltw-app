import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

connectDB();

app.listen(5555, () => {
  console.log("[WSO] Server connected on port 5555");
});
