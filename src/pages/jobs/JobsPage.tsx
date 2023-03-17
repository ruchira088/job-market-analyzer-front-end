import React, {useEffect, useState} from "react"
import {crawledJobsObservable} from "../../services/SearchService"
import {Subscription} from "rxjs"
import {CrawledJob} from "../../services/models/CrawledJob"

const JobsPage = () => {
    const [subscription, setSubscription] = useState<Subscription | undefined>(undefined)
    const [crawledJobs, setCrawledJobs] = useState<CrawledJob[]>([])

    const crawl = () => {
        if (subscription === undefined) {

            const subscription: Subscription =
                crawledJobsObservable
                    .subscribe(crawledJob => setCrawledJobs(crawledJobs.concat(crawledJob)))

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
        </div>
    )
}

export default JobsPage