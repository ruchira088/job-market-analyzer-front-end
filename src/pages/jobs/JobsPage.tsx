import React, {useEffect, useState} from "react"
import {crawledJobsObservable, crawlJobs} from "../../services/SearchService"
import {CrawledJob} from "../../services/models/CrawledJob"
import {Maybe, None, Some} from "monet"
import JobSummaryCard from "../crawler-task/components/job-summary-card/JobSummaryCard"

const JobsPage = () => {
    const [maybeProgress, setProgress] = useState<Maybe<number>>(None)
    const [crawledJobs, setCrawledJobs] = useState<CrawledJob[]>([])

    useEffect(() => {
        const subscription =
            crawledJobsObservable
                .subscribe(crawledJob => {
                    setProgress(Some(crawledJob.progress))
                    setCrawledJobs(crawledJobs => [crawledJob].concat(crawledJobs))
                })

        return () => subscription.unsubscribe()
    }, [])


    return (
        <div>
            <button onClick={crawlJobs}>Crawl Jobs</button>
            <div>
                {maybeProgress.map(progress => <>{progress}</>).orUndefined()}
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