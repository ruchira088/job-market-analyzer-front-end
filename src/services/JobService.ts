import {Observable} from "rxjs"
import {apiUrl} from "../config/ApiConfiguration"
import {CrawledJob} from "./models/CrawledJob"
import {Job} from "./models/Job"
import dayjs from "dayjs"

export const crawlJobs: Observable<CrawledJob> =
    new Observable<CrawledJob>(subscriber => {
        const eventSource: EventSource =
            new EventSource(`${apiUrl}/linkedIn/crawl`, {withCredentials: true})

        subscriber.add(() => {
            eventSource.close()
        })

        eventSource.addEventListener("CRAWLED_JOB", (messageEvent: MessageEvent) => {
            const crawledJob = parseCrawledJob(messageEvent.data)
            subscriber.next(crawledJob)
        })
    })

const parseJob = (json: any): Job => ({...json, crawledAt: dayjs(json.crawledAt)}) as Job

const parseCrawledJob = (json: any): CrawledJob => ({...json, job: parseJob(json.job)}) as CrawledJob