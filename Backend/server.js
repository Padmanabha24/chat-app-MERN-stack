import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from "cors"
import { app, server } from "./socket/socket.js";

import connectToMongoDB from './DB/connectToMongoDB.js';
import authRoutes from "../Backend/Routes/authRoutes.js";
import messageRoutes from "../Backend/Routes/messageRoutes.js"
import userRoutes from "../Backend/Routes/userRoutes.js"
import groupRoutes from "./Routes/groupRoutes.js";




dotenv.config();
 


const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173", // Your frontend's URL
    credentials: true, // Allow cookies and credentials to be sent
  };
  
  app.use(cors(corsOptions));


//Routes
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
app.use("/api/groups", groupRoutes);
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    next();
});

app.get("/",(req,res)=>{
    res.send("server running");
})


server.listen(PORT,()=>{
    connectToMongoDB();
console.log(`server running on port ${PORT}`)}) 