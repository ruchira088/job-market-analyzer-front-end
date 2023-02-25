import React from "react"
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import SignupPage from "../pages/signup/SignupPage"
import LoginPage from "../pages/login/LoginPage"

const UnauthenticatedRoutes = () =>
    <Router>
        <Routes>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/" element={<Navigate to="/login"/>}/>
        </Routes>
    </Router>


export default UnauthenticatedRoutes