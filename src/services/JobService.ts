import {API_URL} from "../config/ApiConfiguration"

export const crawlJobs = () => {
    const eventSource = new EventSource(`${API_URL}/linkedIn/crawl`, {withCredentials: true})

}