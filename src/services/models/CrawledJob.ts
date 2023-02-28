import {Job} from "./Job"

export interface CrawledJob {
    readonly crawledId: string
    readonly currentJobPosition: number
    readonly job: Job
    readonly allPages: number
}