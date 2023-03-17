import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Maybe, None, Some} from "monet"
import {Job} from "../../services/models/Job"
import {retrieveJobById} from "../../services/SearchService"

const JobPage = () => {
    const {jobId} = useParams() as { jobId: string }

    const [maybeJob, setJob] = useState<Maybe<Job>>(None())

    useEffect(() => {
        retrieveJobById(jobId).then(job => setJob(Some(job)))
    }, [ jobId ])

    return maybeJob.map(job =>
        <div>
            <div>{ job.title }</div>
            <img src={job.companyLogoUrl} alt="company logo"/>
            <div>{ job.companyName }</div>
            <div>{ job.location }</div>
            <div>{ job.workplaceType }</div>
            <div dangerouslySetInnerHTML={{__html: job.details}}></div>
        </div>
    )
        .orNull()
}

export default JobPage