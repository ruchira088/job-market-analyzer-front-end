import {Job} from "./Job"

export interface CrawledJob {
    readonly job: Job
    readonly progress: number
}