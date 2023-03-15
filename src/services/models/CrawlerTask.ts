import {Dayjs} from "dayjs"

export interface CrawlerTask {
    readonly id: string
    readonly userId: string
    readonly startedAt: Dayjs
    readonly finishedAt?: Dayjs
}