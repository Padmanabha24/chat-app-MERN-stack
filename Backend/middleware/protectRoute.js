import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const protectRoute=async (req,res,next)=>{
    try {
        // const token=req.cookies.jwt;
        const token=req.cookies["chat-user"];
        if(!token){
            return res.status(401).json({error:"unauthorized - No token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({error:"unauthorized - invalid Token"});
        }
        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({error:"user not found"});
        }

        req.user=user;

        next();
    } 
    catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error from protectRoute" });
    }

}

export default protectRoute;