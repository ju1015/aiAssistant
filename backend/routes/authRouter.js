const express=require('express');
const {signUp,LogIn,LogOut} = require('../controllers/auth.controllers');
const authRouter=express.Router();

authRouter.post('/signup',signUp);
authRouter.post('/signin',LogIn);
authRouter.get('/logout',LogOut);

module.exports=authRouter