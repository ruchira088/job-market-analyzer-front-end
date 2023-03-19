import React from "react"
import {Job} from "../../../services/models/Job"

const JobDetails = (job: Job) => (
    <div>
        <div>{job.title}</div>
        <img src={job.companyLogoUrl} alt="company logo"/>
        <div>{job.companyName}</div>
        <div>{job.location}</div>
        <div>{job.workplaceType}</div>
        <div dangerouslySetInnerHTML={{__html: job.details}}></div>
    </div>
)

export default JobDetails