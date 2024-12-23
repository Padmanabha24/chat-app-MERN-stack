import bcrypt from 'bcryptjs';
import User from "../models/userModels.js"
import generateTokenandSetCookie from "../utils/generateTokens.js"


export const signup = async (req, res) => {
    try {
        console.log("Signup endpoint hit");

        const { fullname, username, password, confirmpassword, gender } = req.body;

        // Validate required fields
        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: `Username '${username}' is already taken` });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile picture URL
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Create new user
        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            // Generate token and set in cookie
            generateTokenandSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        console.error("Error in signup controller:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

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