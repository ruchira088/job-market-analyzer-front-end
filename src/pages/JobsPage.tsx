import React, {useEffect, useState} from "react"
import {crawlJobs} from "../services/JobService"
import {Link} from "react-router-dom"
import {Subscription} from "rxjs"

const JobsPage = () => {
    const [crawlInProgress, setCrawlInProgress] = useState(false)
    let subscription: Subscription | undefined = undefined

    const crawl = () => {
        if (!crawlInProgress) {
            setCrawlInProgress(true)

            subscription = crawlJobs.subscribe(console.log)
            subscription.add(() => setCrawlInProgress(false))
        }
    }

    useEffect(() => () => {
        if (subscription !== undefined && !subscription.closed) {
            console.log("Closing subscription")
            subscription.unsubscribe()
        }
    }, [ subscription ])

    return (
        <div>
            <button onClick={crawl} disabled={crawlInProgress}>Crawl Jobs</button>
            <Link to="/">Home Page</Link>
        </div>
    )
}

export default JobsPage