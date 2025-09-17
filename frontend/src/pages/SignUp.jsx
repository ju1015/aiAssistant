import React, { useContext, useState } from 'react'
import bg from '../assets/authBg.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from "axios"

function SignUp() {
  const [showPassword,setShowPassword]=useState(false);
  const {serverUrl}=useContext(UserDataContext);
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [error,setError]=useState("");

  const handleSignUp=async (e)=>{
    e.preventDefault();
    try{
      let result=await axios.post(`${serverUrl}/api/auth/signup`,{
        name,email,password
      },{withCredentials:true})
      console.log(result.data);

    }catch(err){
      console.log(err);
      setError(err.response.data.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
      <form action="" className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] blackdrop-blur
      shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px]' onSubmit={handleSignUp}>
        <h1 className='text-white text-[30px] font-semibold'>Register to <span className='text-blue-500'>Virtual Assistant</span></h1>
        <input type="text" placeholder='Enter your Name' className='w-full h-[60px] border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' value={name} onChange={(e)=>setName(e.target.value)}/>

        <input type="email" placeholder='Enter your Email' className='w-full h-[60px] border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type={showPassword?"text":"password"} placeholder='Enter your Password' className='w-full h-full rounded-full outline-none bg-transparent
          placeholder-gray-300 px-[20px] py-[10px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          {!showPassword &&
          <FaEye className='absolute top-[18px] right-[20px] text-[white] cursor-pointer w-[25px] h-[25px]'
          onClick={()=>{setShowPassword(true)}} />}

          {showPassword &&
          <FaEyeSlash className='absolute top-[18px] right-[20px] text-[white] cursor-pointer w-[25px] h-[25px]'
          onClick={()=>{setShowPassword(false)}} />}
        </div>
        {error.length>0 && <p className='text-red-500 text-[17px]'>*{error}</p>}
        <button className='min-w-[150px] mt-[30px] h-[60px] rounded-full text-black bg-white font-semibold text-[19px]'>Sign Up</button>
        <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate('/signin')}>Already have an account? <span className='text-blue-400'>Sign In</span></p>
      </form>
    </div>
  )
}

export default SignUp
