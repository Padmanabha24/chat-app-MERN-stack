import jwt from "jsonwebtoken";


const generateTokenandSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Adjust as per your requirements
    });

    res.cookie("chat-user", token, {
        httpOnly: true, // Prevents client-side scripts from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS in production
        sameSite: "strict", // Adjust based on your frontend-backend communication needs
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export default generateTokenandSetCookie;