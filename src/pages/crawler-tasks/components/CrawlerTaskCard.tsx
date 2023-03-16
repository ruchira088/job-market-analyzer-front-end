import React, {useEffect, useState} from "react"
import {CrawlerTask} from "../../../services/models/CrawlerTask"
import {Maybe, None, Some} from "monet"
import {jobCountByCrawlerTaskId} from "../../../services/SearchService"

const CrawlerTaskCard = (crawlerTask: CrawlerTask) => {
    const [jobCount, setJobCount] = useState<Maybe<number>>(None())

    useEffect(() => {
        jobCountByCrawlerTaskId(crawlerTask.id)
            .then(count => setJobCount(Some(count)))
    }, [])

    return (
        <div>
            {
                jobCount
                    .map(count =>
                        <div>
                            <div>
                                {crawlerTask.id}
                            </div>
                            <div>
                                {crawlerTask.startedAt.toString()}
                            </div>
                            <div>
                                {count}
                            </div>
                        </div>
                    )
                    .orUndefined()
            }
        </div>
    )
}

export default CrawlerTaskCard