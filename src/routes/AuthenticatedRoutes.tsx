import React from "react"
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom"
import JobsPage from "../pages/jobs/JobsPage"
import LinkedInCredentialsPage from "../pages/LinkedInCredentialsPage"
import HomePage from "../pages/HomePage"
import CrawlerTasksPage from "../pages/crawler-tasks/CrawlerTasksPage"
import CrawlerTaskPage from "../pages/crawler-task/CrawlerTaskPage"
import JobPage from "../pages/job/JobPage"

const Header = () =>
    <div>
        <Link to="/linkedin/credentials">LinkedIn Credentials</Link>
        <Link to="/crawler-tasks">Crawler Tasks</Link>
        <Link to="/jobs">Job Crawler</Link>
    </div>

const AuthenticatedRoutes = () =>
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/crawler-tasks" element={<CrawlerTasksPage/>}/>
            <Route path="/crawler-task/id/:crawlerTaskId" element={<CrawlerTaskPage/>}/>
            <Route path="/crawler-task/id/:crawlerTaskId/job/id/:jobId" element={<CrawlerTaskPage/>}/>
            <Route path="/jobs" element={<JobsPage/>}/>
            <Route path="/job/id/:jobId" element={<JobPage/>}/>
            <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
        </Routes>
    </Router>

export default AuthenticatedRoutes