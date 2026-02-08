import express from "express";
import authRoutes from './routes/auth.route.js';

dotenv.config();
import dotenv from 'dotenv'
import { ConnectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
const app= express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);


const PORT=process.env.PORT|| 3000;

app.listen(PORT, ()=>{
    console.log("Server running",PORT);
    ConnectDB();
});

