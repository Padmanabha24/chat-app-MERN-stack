import bcrypt from 'bcryptjs';
import User from "../models/userModels.js"
import generateTokenandSetCookie from "../utils/generateTokens.js"


export  const signup=async (req,res)=>{
try{
    console.log("signup page");
const {fullname,username,password,confirmpassword,gender}=req.body;
if(password!=confirmpassword){
    return res.status(400).json({error:"password does not match"})
}

const user=await User.findOne({username})

if(user){
    return res.status(400).json({error:"user already exist"});
}
//Hashing password using bcryptjs
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);


const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;



const newUser=new User({
    fullname,
    username,
    password:hashedPassword,
    gender,
    profilePic: gender=="male" ? boyProfilePic : girlProfilePic
})
if (newUser){
//Generating JWT token
     generateTokenandSetCookie(newUser._id,res);

    await newUser.save();
    res.send(201).json({ 
    _id: newUser._id, 
    fullname: newUser.fullname, 
    username: newUser.username,
    profilePic: newUser.profilePic, 
    })
}
else{
    res.status(400).json({ error: "invalid user data" });

}

}
catch(err){
console.log("Error in signup controller", err.message);
res.status(500).json({ error: "Internal Server Error" });
}
}   

export  const login=async (req,res)=>{
    try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenandSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullname: user.fullname,
			username: user.username,
			profilePic: user.profilePic, 
		});
	} 
    catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}         

export  const logout=(req,res)=>{
     try {
        res.cookie("JWT","",{maxAge:0})
        res.status(200).json({message:"loggedout successfully"})
     } 
     catch (error) {
        console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
     }
}