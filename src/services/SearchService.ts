import {Observable} from "rxjs"
import {apiUrl} from "../config/ApiConfiguration"
import {CrawledJob} from "./models/CrawledJob"
import {Job} from "./models/Job"
import dayjs from "dayjs"
import {handleResponse} from "../utils/HttpUtils"
import {CrawlerTask} from "./models/CrawlerTask"
import {Maybe} from "monet"
import {PaginatedResponse} from "./models/PaginatedResponse"

export const crawledJobsObservable: Observable<CrawledJob> =
    new Observable<CrawledJob>(subscriber => {
        const eventSource: EventSource =
            new EventSource(`${apiUrl}/linkedIn/crawl`, {withCredentials: true})

        subscriber.add(() => {
            eventSource.close()
        })

        eventSource.addEventListener("CRAWLED_JOB", (messageEvent: MessageEvent) => {
            const crawledJob = parseCrawledJob(JSON.parse(messageEvent.data))
            subscriber.next(crawledJob)
        })
    })

export const retrieveCrawlerTasks = async (pageNumber: number): Promise<PaginatedResponse<CrawlerTask>> => {
    const response = await fetch(`${apiUrl}/search/crawler-task?page-number=${pageNumber}`, {credentials: "include"})
    const responseBody = await handleResponse(response)

    return parsePaginatedResponse(responseBody, parseCrawlerTask)
}

export const jobCountByCrawlerTaskId = async (crawlerTaskId: string): Promise<number> => {
    const response = await fetch(`${apiUrl}/search/jobs/crawler-task/id/${crawlerTaskId}/count`, {credentials: "include"})
    const {count} = await handleResponse(response) as { count: number }

    return count
}

export const retrieveJobById = async (jobId: string): Promise<Job> => {
    const response = await fetch(`${apiUrl}/search/jobs/id/${jobId}`, {credentials: "include"})
    const job = await handleResponse(response) as Job

    return job
}

export const retrieveJobsByCrawlerTaskId = async (crawlerTaskId: string, pageSize: number, pageNumber: number): Promise<Job[]> => {
    const response = await fetch(`${apiUrl}/search/jobs/crawler-task/id/${crawlerTaskId}?page-size=${pageSize}&page-number=${pageNumber}`, {credentials: "include"})
    const {results} = await handleResponse(response) as PaginatedResponse<Job>

    return results
}

function parsePaginatedResponse<T>(json: any, parser: (value: any) => T): PaginatedResponse<T> {
    return {pageNumber: json.pageNumber, pageSize: json.pageSize, results: json.results.map(parser)}
}

const parseCrawlerTask = (json: any): CrawlerTask =>
    ({
        ...json,
        startedAt: dayjs(json.startedAt),
        finishedAt: Maybe.fromFalsy(json.finishedAt).map(finishedAt => dayjs(finishedAt)).orUndefined()
    })

const parseJob = (json: any): Job => ({...json, crawledAt: dayjs(json.crawledAt)}) as Job

const parseCrawledJob = (json: any): CrawledJob => ({...json, job: parseJob(json.job)}) as CrawledJob
