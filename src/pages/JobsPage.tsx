import React, {useEffect, useState} from "react"
import {crawlJobs} from "../services/JobService"
import {Link} from "react-router-dom"
import {Subscription} from "rxjs"

const JobsPage = () => {
    const [subscription, setSubscription] = useState<Subscription | undefined>(undefined)

    const crawl = () => {
        if (subscription === undefined) {

            const subscription: Subscription = crawlJobs.subscribe(console.log)
            subscription.add(() => setSubscription(undefined))

            setSubscription(subscription)
        }
    }

    useEffect(() => () => {
        if (subscription !== undefined && !subscription.closed) {
            subscription.unsubscribe()
        }
    }, [ subscription ])

    return (
        <div>
            <button onClick={crawl} disabled={subscription !== undefined}>Crawl Jobs</button>
            <Link to="/">Home Page</Link>
        </div>
    )
}

export default JobsPage