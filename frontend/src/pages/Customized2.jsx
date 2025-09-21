import React, { useContext, useState } from 'react'
import { UserDataContext } from '../context/userContext';
import axios from 'axios';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function Customized2() {
    const {serverUrl,userData,backendImage,selectedImage,setUserData}=useContext(UserDataContext);
    const [assistantName,setAssistantName]=useState(userData?.assistantName||"");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate()

    const handleUpdateAssistant=async()=>{
        setLoading(true); 
        try{
            let formData=new FormData(); 
            formData.append("assistantName",assistantName)
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }else{
                formData.append('imageUrl',selectedImage)
            }
            const result=await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
            setLoading(false);
            setUserData(result.data);
            console.log(result);
            navigate('/')
        }catch(err){
            setLoading(false);
            console.log(err);
        }
    }
  return (
    <div>
      <div className='w-full h-[100vh] bg-gradient-to-t 
      from-[black] to-[#030353] flex justify-center items-center flex-col relative'>
        <IoArrowBackCircleSharp className='cursor-pointer absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]' onClick={()=>navigate('/customize')}/>
        <h1 className='text-white text-center text-[30px] mb-[30px]'>Enter Your <span className='text-blue-200'>Assistan Name</span></h1>
        <input type="text" placeholder='eg.JARVIS' className='w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent
        text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} required/>
        {assistantName && <button
        className='min-w-[300px] mt-[30px] h-[60px] rounded-full text-black bg-white font-semibold text-[19px] cursor-pointer'
        disabled={loading}
        onClick={handleUpdateAssistant}
        >
        {loading ? "Loading..." : "Create Your Assistant"}
        </button>}

      </div>
    </div>
  )
}

export default Customized2
