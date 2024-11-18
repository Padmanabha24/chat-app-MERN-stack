import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';


import connectToMongoDB from './DB/connectToMongoDB.js';
import authRoutes from "../Backend/Routes/authRoutes.js";
import messageRoutes from "../Backend/Routes/messageRoutes.js"

dotenv.config();


const app=express(); 
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


//Routes
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

app.get("/",(req,res)=>{
    res.send("server running");
})


app.listen(PORT,()=>{
    connectToMongoDB();
console.log(`server running on port ${PORT}`)}) 