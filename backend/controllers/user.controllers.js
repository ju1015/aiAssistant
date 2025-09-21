const userModel = require("../models/user.model");
const uploadOnCloudinary=require("../config/cloudinary");
const fetchGemini = require("../gemini");
const { response } = require("express");

const getCurrentUser=async(req,res)=>{
    try{
        const userId=req.userId;
        const user=await userModel.findById(userId).select('-password');
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({message:"get current user error"});
    }
}

const updateAssistant=async (req,res)=>{
    try{
        const {assistantName,imageUrl}=req.body;
        let assistantImage;
        if(req.file){
            assistantImage=await uploadOnCloudinary(req.file.path);
        }else{
            assistantImage=imageUrl;
        }
        
        const user=await userModel.findById(req.userId,{assistantImage,assistantName},{new:true}).select("-password");
        return res.status(200).json(user);
    }catch(err){
        return res.status(400).json({message:"updateAssistantError"});
    }
}

const askToAssistant=async (req,res)=>{
    try{
        const {command}=req.body;
        const user=await userModel.findById(req.userId);
        const userName=user.name;
        const assistantName=user.assistantName;
        const result=await fetchGemini(command,assistantName,userName)

        const jsonMatch = result.text.match(/{[\s\S]*}/);
        if(!jsonMatch){
            return res.status(400).json({response:"sorry, I can't understand"});
        }
        const gemResult=JSON.parse(jsonMatch[0])
        const type=gemResult.type;

        switch(type){
         case 'get-date' :
            return res.json({
               type,
               userInput:gemResult.userInput,
               response:`current date is ${moment().format("YYYY-MM-DD")}`
            });
            case 'get-time':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`current time is ${moment().format("hh:mm A")}`
            });
             case 'get-day':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`today is ${moment().format("dddd")}`
            });
            case 'get-month':
                return res.json({
               type,
               userInput:gemResult.userInput,
               response:`today is ${moment().format("MMMM")}`
            });
            case 'google-search':
            case 'youtube-search':
            case 'youtube-play':
            case 'general':
            case  "calculator-open":
            case "instagram-open": 
            case "facebook-open": 
            case "weather-show" :
            return res.json({
                type,
                userInput:gemResult.userInput,
                response:gemResult.response,
            });

            default:
                return res.status(400).json({ response: "I didn't understand that command." })
      }
     
   } catch (error) {
        console.error("askToAssistant error:", error);
        return res.status(500).json({ response: "ask assistant error", error: error.message });
    }
}


module.exports={getCurrentUser,updateAssistant,askToAssistant}