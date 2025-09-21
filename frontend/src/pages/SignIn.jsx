import React, { useContext, useState } from 'react'
import bg from '../assets/authBg.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from "axios"

function SignIn() {
  const [showPassword,setShowPassword]=useState(false);
  const {serverUrl,userData,setUserData}=useContext(UserDataContext);
  const navigate=useNavigate();
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSignIn=async (e)=>{
    e.preventDefault();
    setError("");
    setLoading(true);
    try{
      let result=await axios.post(`${serverUrl}/api/auth/signin`,{
        email,password
      },{withCredentials:true})
      setUserData(result.data);
      setLoading(false);
      navigate("/customize")
    }catch(err){
      console.log(err);
      setUserData(null);
      setLoading(false);
      setError(err.response.data.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${bg})`}}>
      <form action="" className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] blackdrop-blur
      shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px]' onSubmit={handleSignIn}>
        <h1 className='text-white text-[30px] font-semibold'>SignIn to <span className='text-blue-500'>Virtual Assistant</span></h1>

        <input type="email" placeholder='Enter your Email' className='w-full h-[60px] border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' value={email} onChange={(e)=>setEmail(e.target.value)} required/>

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
        <button className='min-w-[150px] mt-[30px] h-[60px] rounded-full text-black bg-white font-semibold text-[19px]' disabled={loading}>{loading?"Loading...":"Sign In"}</button>
        <p className='text-[white] text-[18px] cursor-pointer' onClick={()=>navigate('/signup')}>Want to create a new account? <span className='text-blue-400'>Sign Up</span></p>
      </form>
    </div>
  )
}

export default SignIn
