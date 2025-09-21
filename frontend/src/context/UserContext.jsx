import React, { createContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
export const UserDataContext=createContext()

function UserContext({children}) {
    const serverUrl="http://localhost:3000"
    const [userData,setUserData]=useState(null);
    const [frontendImage,setFrontendImage]=useState(null);
    const [backendImage,setBackendImage]=useState(null);
    const [selectedImage,setSelectedImage]=useState(null);
    const handleCurrentUser=async()=>{
      try{
        const result=await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
        setUserData(result.data);
        console.log(result.data);
      }catch(err){
        console.log(err);
      }
    }

    const getGeminiResponse=async (command)=>{
      try {
        const result=await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
        return result.data
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      handleCurrentUser();
    },[])

    const val={
        serverUrl,userData,setUserData,backendImage,setBackendImage,
        frontendImage,setFrontendImage,selectedImage,setSelectedImage,getGeminiResponse
    }
  return (
    <div>
        <UserDataContext.Provider value={val}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
