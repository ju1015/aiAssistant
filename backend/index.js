const express = require("express");
const dotenv=require("dotenv");
dotenv.config();
const connectDb=require('./config/db.js');
const authRouter = require("./routes/authRouter.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/user.routes.js");
const fetchGemini=require('./gemini.js');


const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

const port=process.env.PORT || 5000;

app.use("/api/auth",authRouter);
app.use('/api/user',userRouter);

app.get('/',async (req,res)=>{
    let prompt=req.query.prompt || "Hello Gemini!";
    let data=await fetchGemini(prompt);
    res.json(data);
})

app.listen(port,()=>{
    connectDb();
    console.log('server started');
})