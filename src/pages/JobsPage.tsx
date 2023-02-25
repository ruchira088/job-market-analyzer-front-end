import React, {useState} from "react"
import {crawlJobs} from "../services/JobService"
import {Link} from "react-router-dom"

const JobsPage = () => {
    const [crawlInProgress, setCrawlInProgress] = useState(false)

    const crawl = () => {
        setCrawlInProgress(true)
        crawlJobs()
    }

    return (
        <div>
            <button onClick={crawl} disabled={crawlInProgress}>Crawl Jobs</button>
            <Link to="/">Home Page</Link>
        </div>
    )
}

export default JobsPage