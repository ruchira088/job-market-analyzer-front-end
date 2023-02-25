import {apiUrl} from "../config/ApiConfiguration"

export const crawlJobs = () => {
    const eventSource: EventSource =
        new EventSource(`${apiUrl}/linkedIn/crawl`, {withCredentials: true})



}