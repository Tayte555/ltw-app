import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get("/", (req,res)=>{
    res.json("Server responding");
})

app.listen(5555, ()=>{
    console.log("Server connected");
})