import {apiUrl} from "../config/ApiConfiguration"

export const crawlJobs = () => {
    const eventSource = new EventSource(`${apiUrl}/linkedIn/crawl`, {withCredentials: true})

}