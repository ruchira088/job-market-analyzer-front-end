import React, {useState} from "react"
import {crawlJobs} from "../services/JobService"

const JobsPage = () => {
    const [crawlInProgress, setCrawlInProgress] = useState(false)

    const crawl = () => {
        setCrawlInProgress(true)
        crawlJobs()
    }

    return (
        <div>
            <button onClick={crawl} disabled={crawlInProgress}>Crawl Jobs</button>
        </div>
    )
}

export default JobsPage