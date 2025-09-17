const express = require("express");
const dotenv=require("dotenv");
dotenv.config();
const connectDb=require('./config/db.js');
const authRouter = require("./routes/authRouter.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const port=process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);

app.get('/',(req,res)=>{
    res.send('HI');
})

app.listen(port,()=>{
    connectDb();
    console.log('server started');
})