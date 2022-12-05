
export interface ErrorResponse {
    readonly errorMessage: string
}

export async function handleResponse<A>(response: Response): Promise<A> {
    const responseBody = await response.json()

    if (response.status >= 200 && response.status < 300) {
        return responseBody
    } else {
        const errorResponse = responseBody as unknown as ErrorResponse
        return Promise.reject(errorResponse.errorMessage)
    }
}