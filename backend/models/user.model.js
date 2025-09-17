const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        requied:true
    },
    assistantName:{
        type:String
    },
    assistantImage:{
        type:String
    },
    history:[
        {type:String}
    ]
})

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;