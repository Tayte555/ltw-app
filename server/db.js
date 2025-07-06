import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.WSO_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("[WSO] Connected to MongoDB");
  } catch (err) {
    console.error("[WSO] MongoDB connection error: ", err);
  }
}

export { client };
