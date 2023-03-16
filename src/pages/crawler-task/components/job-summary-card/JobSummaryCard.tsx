import React from "react"
import {Job} from "../../../../services/models/Job"

import styles from "./JobSummaryCard.module.scss"

const JobSummaryCard = (job: Job) =>
    <div className={styles.jobSummaryCard}>
        <div className={styles.imageColumn}>
            <img src={job.companyLogoUrl} alt="company logo"/>
        </div>
        <div className={styles.detailsColumn}>
            <div>{ job.title }</div>
            <div>{ job.companyName }</div>
            <div>{ job.workplaceType }</div>
            <div>{ job.location }</div>
        </div>
    </div>

export default JobSummaryCard