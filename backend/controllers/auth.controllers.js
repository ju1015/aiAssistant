const createToken = require('../config/token.js');
const userModel=require('../models/user.model.js')
const bcrypt=require('bcrypt');


const signUp=async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        let user=await userModel.findOne({email});
        if(user) return res.status(400).send({message:"email already exists!"});

        if(password.length<6){
            return res.status(400).send({message:"password must be atleast 6 characters!"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password,salt);

        user=await userModel.create({
            name,
            email,
            password:hashedPass
        })
        
        const token=createToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"lax",
            secure:false,
            path: "/" 
        });

        return res.status(201).json(user);

    }catch(err){
        return res.status(500).json({
            message:`signup error ${err}`
        })
    }
}



const LogIn=async (req,res)=>{
    try{
        const {email,password}=req.body;
        let user=await userModel.findOne({email});
        if(!user) return res.status(400).send({message:"user does exists!"});

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch) return res.status(400).send({message:"Something Went Wrong!"});

        // Create token
        const token =createToken(user._id); // no need for await

        // Set token as cookie
        res.cookie("token", token, {
            httpOnly: true,           // cannot be accessed by frontend JS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "lax",       // adjust for cross-origin if needed
            secure: false, 
            path: "/"            // true if using HTTPS
        });

        return res.status(200).json(user);

    }catch(err){
        return res.status(500).json({
            message:`Login error ${err}`
        })
    }
}



const LogOut=async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"Logout Successfully"});
    }catch(err){
        return res.status(500).json({
            message:`Logout error ${err}`
        })
    }
}


module.exports = {
  signUp,
  LogIn,
  LogOut
};



