// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import PasswordRecovery from "./pages/PasswordRecovery"
import NotFound from "./pages/NotFound"
import VerifyUser from "./pages/VerifyUser"
import ProfileManagement from "./pages/ProfileManagement"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
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