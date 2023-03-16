import React, {useEffect, useState} from "react"
import {retrieveCrawlerTasks} from "../../services/SearchService"
import {CrawlerTask} from "../../services/models/CrawlerTask"
import CrawlerTaskCard from "./components/CrawlerTaskCard"
import {Link} from "react-router-dom"

const CrawlerTasksPage = () => {
    const [crawlerTasks, setCrawlerTasks] = useState<CrawlerTask[]>([])
    const [pageNumber, setPageNumber] = useState<number>(0)

    useEffect(() => {
        retrieveCrawlerTasks(pageNumber)
            .then(({results, pageSize}) => {
                setCrawlerTasks(crawlerTasks.concat(results))

                if (results.length === pageSize) {
                    setPageNumber(pageNumber + 1)
                }

            })
    }, [pageNumber])

    return (
        <div>
            {
                crawlerTasks
                    .map(crawlerTask =>
                        <Link key={crawlerTask.id} to={`/crawler-task/id/${crawlerTask.id}`}>
                            <CrawlerTaskCard key={crawlerTask.id} {...crawlerTask}/>
                        </Link>
                    )
            }
        </div>
    )
}

export default CrawlerTasksPage