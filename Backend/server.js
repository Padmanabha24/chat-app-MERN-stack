import express from 'express';
import dotenv from "dotenv"


import authRoutes from "../Backend/Routes/authRoutes.js";
import connectToMongoDB from './DB/connectToMongoDB.js';

dotenv.config();

const app=express(); 
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth',authRoutes);

app.get("/",(req,res)=>{
    res.send("server running");
})


app.listen(PORT,()=>{
    connectToMongoDB();
console.log(`server running on port ${PORT}`)}) 