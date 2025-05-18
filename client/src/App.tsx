// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import { Home,Login,MyDrive,Signup,PasswordRecovery,ProfileManagement,VerifyUser,NotFound } from "./pages"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/my-drive" element={<MyDrive/>} />
        <Route path="/sign-up" element={<Signup/>} />
        <Route path="/password-recovery" element={<PasswordRecovery/>} />
        <Route path="/profile" element={<ProfileManagement/>} />
        <Route path="/verify-user" element={<VerifyUser/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
  )
}

export default App