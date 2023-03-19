import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Maybe, None, Some} from "monet"
import {Job} from "../../services/models/Job"
import {retrieveJobById} from "../../services/SearchService"
import JobDetails from "./components/JobDetails"

const JobPage = () => {
    const {jobId} = useParams() as { jobId: string }

    const [maybeJob, setJob] = useState<Maybe<Job>>(None())

    useEffect(() => {
        retrieveJobById(jobId).then(job => setJob(Some(job)))
    }, [ jobId ])

    return maybeJob.map(job => <JobDetails {...job}/>)
        .orNull()
}

export default JobPage