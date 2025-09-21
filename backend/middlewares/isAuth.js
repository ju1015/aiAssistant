const jwt = require("jsonwebtoken");

const isAuth=async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token) return res.status(400).json({message:"token not found"})
        const userVerifyToken=await jwt.verify(token,process.env.JWT_SECRET);
        req.userId=userVerifyToken.userId;
        next();
    }catch(err){
        return res.status(500).json({message:"is Auth Error"});
    }
}

module.exports=isAuth;