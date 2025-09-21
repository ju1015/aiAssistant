import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import authBg from '../assets/authBg.png'
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { FaCloudUploadAlt } from "react-icons/fa";
import { UserDataContext } from '../context/userContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { IoArrowBackCircleSharp } from "react-icons/io5";

function Customized() {
  const {serverUrl,userData,setUserData,backendImage,setBackendImage,
  frontendImage,setFrontendImage,selectedImage,setSelectedImage}=useContext(UserDataContext)
  const inputImage=useRef();
  const navigate=useNavigate();

  const handleImage = (e) => {
  const file = e.target.files?.[0]; // safely access first file
  if (!file) return; // exit if user cancels dialog
  setBackendImage(file);
  setFrontendImage(URL.createObjectURL(file));
};

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col relative'>
      <IoArrowBackCircleSharp className='cursor-pointer absolute top-[30px] left-[30px] text-white w-[25px] h-[25px]' onClick={()=>{
        console.log('hi');
        navigate('/')}}/>
      <h1 className='text-white text-center text-[30px] mb-[30px]'>Select your <span className='text-blue-200'>Assistant Image</span></h1>
      <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px] p-[20px] '>
        <Card image={image1}/>
        <Card image={image2}/>
        <Card image={image4}/>
        <Card image={authBg}/>
        <Card image={image5}/>
        <Card image={image6}/>
        <Card image={image7}/>
        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#020220]
        rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 
        hover:border-white hover:border-4 cursor-pointer flex items-center justify-center
        ${selectedImage=='input'?"border-4 border-white shadow-2xl shadow-blue-950":"null"}`} onClick={()=>{
          inputImage.current.click()
          setSelectedImage("input")
        }}>
          {!frontendImage && <FaCloudUploadAlt className='text-white w-[25px] h-[25px]'/>}
          {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}
        </div>
        <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
      </div>
      {selectedImage && <button className='min-w-[150px] mt-[30px] h-[60px] rounded-full text-black
      bg-white font-semibold text-[19px] cursor-pointer' onClick={()=>navigate("/customize2")}>Next</button>}
    </div>
  )
}

export default Customized
