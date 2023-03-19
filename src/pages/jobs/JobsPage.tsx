import React, {useEffect, useState} from "react"
import {crawledJobsObservable} from "../../services/SearchService"
import {Subscription} from "rxjs"
import {CrawledJob} from "../../services/models/CrawledJob"
import {Maybe, None, Some} from "monet"
import JobSummaryCard from "../crawler-task/components/job-summary-card/JobSummaryCard"

const JobsPage = () => {
    const [maybeSubscription, setSubscription] = useState<Maybe<Subscription>>(None)
    const [maybeProgress, setProgress] = useState<Maybe<number>>(None)
    const [crawledJobs, setCrawledJobs] = useState<CrawledJob[]>([])

    const crawl = () => {
        if (maybeSubscription.isNone()) {

            const subscription: Subscription =
                crawledJobsObservable
                    .subscribe(crawledJob => {
                        setProgress(Some(crawledJob.progress))
                        setCrawledJobs(crawledJobs.concat(crawledJob))
                    })

            subscription.add(() => setSubscription(None))

            setSubscription(Some(subscription))
        }
    }

    useEffect(() => () => {
        maybeSubscription
            .filter(subscription => !subscription.closed)
            .forEach(subscription => subscription.unsubscribe())
    }, [ maybeSubscription ])

    return (
        <div>
            <button onClick={crawl} disabled={maybeSubscription.isSome()}>Crawl Jobs</button>
            <div>
                { maybeProgress.map(progress => <>{progress}</>).orUndefined() }
            </div>
            <div>
                {
                    crawledJobs.map(({job}) => <div><JobSummaryCard key={job.id} {...job}/></div>)
                }
            </div>
        </div>
    )
}

export default JobsPage