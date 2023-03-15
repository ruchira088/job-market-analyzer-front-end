import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import JobsPage from "../pages/jobs/JobsPage"
import LinkedInCredentialsPage from "../pages/LinkedInCredentialsPage"
import HomePage from "../pages/HomePage"
import CrawlerTasksPage from "../pages/crawler-tasks/CrawlerTasksPage"

const AuthenticatedRoutes = () =>
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/crawler-tasks" element={<CrawlerTasksPage/>}/>
            <Route path="/jobs" element={<JobsPage/>}/>
            <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
        </Routes>
    </Router>

export default AuthenticatedRoutes