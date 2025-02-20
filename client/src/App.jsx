
import React from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import EmailVerify from "./pages/Auth/EmailVerify"
import ResetPassword from "./pages/Auth/ResetPassword"

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/email-verify" element={<EmailVerify/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />

      </Routes>
    </div>
  )
   
}

export default App
