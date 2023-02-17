import {apiUrl} from "../config/ApiConfiguration"
import {handleResponse} from "../utils/HttpUtils"
import {LinkedInCredentials} from "./models/LinkedInCredentials"

interface LinkedInCredentialsInsertionRequest {
    readonly email: string
    readonly password: string
}

export const insertLinkedInCredentials =
    async (linkedInCredentialsInsertionRequest: LinkedInCredentialsInsertionRequest): Promise<LinkedInCredentials> => {
        const response = await fetch(`${apiUrl}/linkedIn/credentials`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(linkedInCredentialsInsertionRequest)
        })

        return handleResponse(response)
    }

export const fetchLinkedInCredentials =
    async (): Promise<LinkedInCredentials | null> => {
        const response = await fetch(`${apiUrl}/linkedIn/credentials`, {credentials: "include"})

        if (response.status === 404) {
            return null
        } else {
            return handleResponse(response)
        }
    }