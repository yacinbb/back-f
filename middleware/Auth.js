
const Jwt = require("jsonwebtoken");
const User = require("../models/User");
const chekAuth = async(req , res ,next )=>{
    try {
    
    const token = req.headers.authorization.split(' ')[1]
    if (!token){
        return res
        .status(401)
        .json({ error: "No token provided, authorization denied" });
    }
    const decodedToken = Jwt.verify(token , process.env.SECRET_JWT)
    const userId = decodedToken.userId 
    const user = await User.findById(userId)
    if (!user) {
        return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user 
    next();
    }catch(error){
        return res.status(401).json({ error: "Invalid/Expired token" });
    }
}
module.exports = {chekAuth}