import jwt from "jsonwebtoken"

const generateTokenandSetCookie=(userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })
    res.cookie("jwt", token, {
        maxAge:15*24*60*60*1000, //life of a cookie is 15 days in ms
        httpOnly:true, //prevent cross site scripting attacks
        samSite:"srict", //prevent css forgery attacks
        secure:process.env.NODE_ENV !== "development"
    })
}

export default generateTokenandSetCookie;