import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { UserDataContext } from './context/userContext'
import Customized from './pages/Customized'
import Customized2 from './pages/Customized2'
import Home from './pages/Home'

function App() {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <Routes>
      <Route 
        path="/" 
        element={ (userData?.assistantImage && userData?.assistantName) 
          ? <Home /> 
          : <Navigate to="/customize" /> } 
      />
      <Route 
        path="/signup" 
        element={ !userData 
          ? <SignUp /> 
          : <Navigate to="/" /> } 
      />
      <Route 
        path="/signin" 
        element={ !userData 
          ? <SignIn /> 
          : <Navigate to="/" /> } 
      />
      <Route 
        path="/customize" 
        element={ userData 
          ? <Customized /> 
          : <Navigate to="/signup" /> } 
      />
      <Route 
        path="/customize2" 
        element={ userData 
          ? <Customized2 /> 
          : <Navigate to="/signup" /> } 
      />
    </Routes>
  )
}

export default App
