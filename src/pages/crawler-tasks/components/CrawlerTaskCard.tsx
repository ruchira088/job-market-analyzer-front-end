import React, {useEffect, useState} from "react"
import {CrawlerTask} from "../../../services/models/CrawlerTask"
import {Maybe, None, Some} from "monet"
import {jobCountByCrawlerTaskId} from "../../../services/SearchService"

const CrawlerTaskCard = (props: CrawlerTask) => {
    const [jobCount, setJobCount] = useState<Maybe<number>>(None())

    useEffect(() => {
        jobCountByCrawlerTaskId(props.id)
            .then(count => setJobCount(Some(count)))
    }, [])

    return (
        <div>
            { jobCount.map(count => <div>{ count }</div>).orUndefined() }
        </div>
    )
}

export default CrawlerTaskCard