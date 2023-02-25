import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import JobsPage from "../pages/JobsPage"
import LinkedInCredentialsPage from "../pages/LinkedInCredentialsPage"
import HomePage from "../pages/HomePage"

const AuthenticatedRoutes = () =>
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/jobs" element={<JobsPage/>}/>
            <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
        </Routes>
    </Router>

export default AuthenticatedRoutes