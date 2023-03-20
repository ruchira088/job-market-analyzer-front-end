import React from "react"
import {BrowserRouter as Router, Link, matchPath, Route, Routes, useLocation} from "react-router-dom"
import classnames from "classnames"
import JobsPage from "../../pages/jobs/JobsPage"
import LinkedInCredentialsPage from "../../pages/LinkedInCredentialsPage"
import HomePage from "../../pages/HomePage"
import CrawlerTasksPage from "../../pages/crawler-tasks/CrawlerTasksPage"
import CrawlerTaskPage from "../../pages/crawler-task/CrawlerTaskPage"
import JobPage from "../../pages/job/JobPage"

import styles from "./AuthenticatedRoutes.module.scss"

interface RouteLink {
    readonly label: string
    readonly path: string
}

const routeLinks: RouteLink[] = [
    {label: "Crawler Tasks", path: "/crawler-task"},
    {label: "Job Crawler", path: "/jobs"},
    {label: "LinkedIn Credentials", path: "/linkedin/credentials"}
]

const Header = () => {
    const {pathname} = useLocation()


    return (
        <div className={styles.header}>
            {
                routeLinks.map(routeLink =>
                    <Link
                        className={classnames(styles.heading, {[styles.routeMatch]: matchPath(`${routeLink.path}/*`, pathname)})}
                          to={routeLink.path}
                          key={routeLink.path}>
                        {routeLink.label}
                    </Link>
                )
            }
        </div>
    )

}

const AuthenticatedRoutes = () =>
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/crawler-task" element={<CrawlerTasksPage/>}/>
            <Route path="/crawler-task/id/:crawlerTaskId" element={<CrawlerTaskPage/>}/>
            <Route path="/crawler-task/id/:crawlerTaskId/job/id/:jobId" element={<CrawlerTaskPage/>}/>
            <Route path="/jobs" element={<JobsPage/>}/>
            <Route path="/job/id/:jobId" element={<JobPage/>}/>
            <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
        </Routes>
    </Router>

export default AuthenticatedRoutes