import React from "react"
import {Link} from "react-router-dom"

const HomePage = () =>
    <div>
        <Link to="/linkedin/credentials">LinkedIn Credentials</Link>
        <Link to="/jobs">Job Crawler</Link>
    </div>

export default HomePage