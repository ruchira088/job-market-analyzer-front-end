import React, {useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import {Job} from "../../services/models/Job"
import {Maybe, None, Some} from "monet"
import {retrieveJobsByCrawlerTaskId} from "../../services/SearchService"
import JobSummaryCard from "./components/job-summary-card/JobSummaryCard"

const CrawlerTaskPage = () => {
    const pageSize = 10
    const {crawlerTaskId} = useParams() as { crawlerTaskId: string }

    const [jobs, setJobs] = useState<Maybe<Job[]>>(None())
    const [pageNumber, setPageNumber] = useState<number>(0)

    useEffect(
        () => {
            retrieveJobsByCrawlerTaskId(crawlerTaskId, pageSize, pageNumber)
                .then(result => {
                    setJobs(jobs => Some(jobs.getOrElse([]).concat(result)))

                    if (result.length === pageSize) {
                        setPageNumber(pageNumber + 1)
                    }
                })
        },
        [pageNumber, crawlerTaskId]
    )


    return (
        <div>
            {
                jobs.map(values =>
                    values.map(job =>
                        <Link key={job.id} to={`/job/id/${job.id}`}>
                            <JobSummaryCard {...job}/>
                        </Link>
                    )
                )
                    .orUndefined()
            }
        </div>
    )
}

export default CrawlerTaskPage