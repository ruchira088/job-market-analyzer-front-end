import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {Maybe, None, Some} from "monet"
import classNames from "classnames"
import {Job} from "../../services/models/Job"
import {retrieveJobsByCrawlerTaskId} from "../../services/SearchService"
import JobSummaryCard from "./components/job-summary-card/JobSummaryCard"
import JobDetails from "../job/components/JobDetails"

import styles from "./CrawlerTaskPage.module.scss"

const CrawlerTaskPage = () => {
    const pageSize = 10
    const {crawlerTaskId, jobId} = useParams() as { readonly crawlerTaskId: string, readonly jobId?: string }

    const [maybeJobs, setJobs] = useState<Maybe<Job[]>>(None())
    const [maybeJobId, setJobId] = useState<Maybe<string>>(Maybe.fromFalsy(jobId))
    const [pageNumber, setPageNumber] = useState<number>(0)
    const [maybeKeyword, setKeyword] = useState<Maybe<string>>(None())
    const [maybeTimeoutId, setTimeoutId] = useState<Maybe<NodeJS.Timeout>>(None())

    const navigate = useNavigate()

    useEffect(() => {
        maybeJobs.forEach(jobs => {
            if (maybeJobId.isNone() && jobs.length > 0) {
                setJobId(Some(jobs[0].id))
            }
        })
    }, [maybeJobId, maybeJobs])

    useEffect(() => {
        Maybe.fromFalsy(jobId)
            .forEach(id => setJobId( _ => Some(id)))
    }, [jobId])

    useEffect(
        () => {
            retrieveJobsByCrawlerTaskId(crawlerTaskId, maybeKeyword, pageSize, pageNumber)
                .then(result => {
                    setJobs(jobs => Some(jobs.getOrElse([]).concat(result)))

                    if (result.length === pageSize) {
                        setPageNumber(pageNumber + 1)
                    }
                })
        },
        [pageNumber, crawlerTaskId, maybeKeyword]
    )

    const onTextInput: ChangeEventHandler<HTMLInputElement> =
        (inputEvent: ChangeEvent<HTMLInputElement>) => {
            maybeTimeoutId.forEach(timeoutId => clearTimeout(timeoutId))

            const maybeText =
                Maybe.fromFalsy(inputEvent.target.value)
                    .filter(input => input.length !== 0)

            const timeoutId =
                setTimeout(() => {
                    setKeyword(maybeText)
                    setPageNumber(0)
                    setJobs(None())
                    setJobId(None())
                    navigate(`/crawler-task/id/${crawlerTaskId}`)
                }, 500)

            setTimeoutId(Some(timeoutId))
        }

    const highlightKeywords = (html: string): string =>
        maybeKeyword
            .map(keyword =>
                html.replaceAll(
                    new RegExp(`${keyword}(?!\\w)`, "gmi"),
                    `<span class="${styles.highlightKeyword}">${keyword}</span>`
                )
            )
            .getOrElse(html)

    return (
        <div className={styles.crawlerTaskPage}>
            <div className={styles.jobsColumn}>
                <input onChange={onTextInput}/>
                { maybeJobs.map(jobs => <div className={styles.resultsCount}>{jobs.length} results found</div>).orUndefined() }
                <div className={styles.jobsList}>
                    {
                        maybeJobs.map(values =>
                            values.map(job =>
                                <Link
                                    to={`/crawler-task/id/${crawlerTaskId}/job/id/${job.id}`}
                                    key={job.id}
                                    className={classNames(styles.jobSummaryCardLink, {[styles.selected]: job.id === maybeJobId.orNull()})}>
                                    <JobSummaryCard {...job}/>
                                </Link>
                            )
                        )
                            .orUndefined()
                    }
                </div>
            </div>
            <div className={styles.jobDetailsColumn}>
                {
                    maybeJobs
                        .flatMap(jobs => Maybe.fromFalsy(jobs.find(job => job.id === maybeJobId.orNull())))
                        .map(job => <JobDetails {...job} details={highlightKeywords(job.details)}/>)
                        .orUndefined()
                }
            </div>
        </div>

    )
}

export default CrawlerTaskPage