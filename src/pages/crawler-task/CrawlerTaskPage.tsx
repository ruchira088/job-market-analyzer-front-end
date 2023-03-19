import React, {useEffect, useState} from "react"
import {Link, useParams, useNavigate} from "react-router-dom"
import {Job} from "../../services/models/Job"
import {Maybe, None, Some} from "monet"
import {retrieveJobsByCrawlerTaskId} from "../../services/SearchService"
import JobSummaryCard from "./components/job-summary-card/JobSummaryCard"
import JobDetails from "../job/components/JobDetails"

import styles from "./CrawlerTaskPage.module.scss"
import classNames from "classnames"

const CrawlerTaskPage = () => {
    const pageSize = 10
    const {crawlerTaskId, jobId} = useParams() as { readonly crawlerTaskId: string, readonly jobId?: string }

    const [maybeJobs, setJobs] = useState<Maybe<Job[]>>(None())
    const [pageNumber, setPageNumber] = useState<number>(0)

    const navigate = useNavigate()

    useEffect(() => {
        retrieveJobsByCrawlerTaskId(crawlerTaskId, 1, 0)
            .then(jobs => {
                if (jobId === undefined && jobs.length > 0) {
                    navigate(`/crawler-task/id/${crawlerTaskId}/job/id/${jobs[0].id}`)
                }
            })
    }, [jobId, navigate, crawlerTaskId])

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
        <div className={styles.crawlerTaskPage}>
            <div className={styles.jobsColumn}>
                {
                    maybeJobs.map(values =>
                        values.map(job =>
                            <Link
                                to={`/crawler-task/id/${crawlerTaskId}/job/id/${job.id}`}
                                key={job.id}
                                className={classNames(styles.jobSummaryCardLink, {[styles.selected]: job.id === jobId})}>
                                <JobSummaryCard {...job}/>
                            </Link>
                        )
                    )
                        .orUndefined()
                }
            </div>
            <div className={styles.jobDetailsColumn}>
                {
                    maybeJobs
                        .flatMap(jobs => Maybe.fromFalsy(jobs.find(job => job.id === jobId)))
                        .map(job => <JobDetails {...job}/>)
                        .orUndefined()
                }
            </div>
        </div>

    )
}

export default CrawlerTaskPage