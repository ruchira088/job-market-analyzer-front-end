import {Dayjs} from "dayjs"

export interface Job {
    readonly id: string;
    readonly crawlId: string
    readonly link: string
    readonly title: string
    readonly companyName: string
    readonly companyLogoUrl: string
    readonly location: string
    readonly details: string
    readonly crawledAt: Dayjs
    readonly workplaceType?: WorkplaceType;
}

export enum WorkplaceType {
    REMOTE = "REMOTE",
    HYBRID = "HYBRID",
    ON_SITE = "ON_SITE"
}