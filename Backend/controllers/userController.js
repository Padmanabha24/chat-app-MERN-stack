import User from "../models/userModels.js";

export const getUserForSideBar=async ( req,res)=>{
    try {
        const loggedInUserId=req._id;
        const allUsers=await User.find();

        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}