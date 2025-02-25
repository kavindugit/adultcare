
import React from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import EmailVerify from "./pages/Auth/EmailVerify"
import ResetPassword from "./pages/Auth/ResetPassword"

import Gallery from "./pages/Gallery"
import SignUp from "./pages/Auth/SignUp"


const App = () => {

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/email-verify" element={<EmailVerify/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/gallery" element={<Gallery/>} />

      </Routes>
    </div>
  )
   
}

export default App
