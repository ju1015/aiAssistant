const jwt=require('jsonwebtoken');

const createToken=(userId)=>{
    try{
        const token=jwt.sign({
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