import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import JobsPage from "../pages/JobsPage"
import LinkedInCredentialsPage from "../pages/LinkedInCredentialsPage"

const AuthenticatedRoutes = () =>
    <Router>
        <div>Hello</div>
        <Routes>
            <Route path="/jobs" element={<JobsPage/>}/>
            <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
            <Route path="/" element={<div>Hi</div>}/>
        </Routes>
    </Router>

export default AuthenticatedRoutes