
export function withRetries<T>(execute: () => Promise<T>, delay: number, limit: number): Promise<T> {
    return execute().catch(error => {
        if (limit < 1) {
            return Promise.reject(error)
        } else {
            return wait(500).then(() => withRetries(execute, delay, limit - 1))
        }
    })
}

const wait = (milliseconds: number): Promise<void> =>
    new Promise<void>(resolve => {
        setTimeout(() => resolve(), milliseconds)
    })