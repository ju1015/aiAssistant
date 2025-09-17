const jwt=require('jsonwebtoken');

const createToken=async(userId)=>{
    try{
        const token=await jwt.sign({
            userId
        },process.env.JWT_SECRET,{
            expiresIn:"10d"
        })
        return token;
    }
    catch(e){
        console.log(e);
    }
}

module.exports=createToken;