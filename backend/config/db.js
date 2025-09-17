const mongoose=require('mongoose');

const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected with db')
    }catch(e){
        console.log(e);
    }
}

module.exports=connectDb;