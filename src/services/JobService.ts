import {Observable} from "rxjs"
import {apiUrl} from "../config/ApiConfiguration"
import {CrawledJob} from "./models/CrawledJob"

export const crawlJobs: Observable<CrawledJob> =
    new Observable<CrawledJob>(subscriber => {
        const eventSource: EventSource =
            new EventSource(`${apiUrl}/linkedIn/crawl`, {withCredentials: true})

        subscriber.add(() => {
            eventSource.close()
        })

        eventSource.onmessage = (event: Event) => {
            console.log(event)
            subscriber.next()
        }

        eventSource.onerror = (event: Event) => {
            console.log(event)
            subscriber.error()
        }
    })
