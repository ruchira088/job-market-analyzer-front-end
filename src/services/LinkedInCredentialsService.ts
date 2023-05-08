import {apiUrl} from "../config/ApiConfiguration"
import {handleResponse} from "../utils/HttpUtils"
import {LinkedInCredentials} from "./models/LinkedInCredentials"

interface LinkedInCredentialsRequest {
    readonly email: string
    readonly password: string
}

export const insertLinkedInCredentials =
    async (linkedInCredentialsRequest: LinkedInCredentialsRequest): Promise<LinkedInCredentials> => {
        const response = await fetch(`${apiUrl}/linkedIn/credentials`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(linkedInCredentialsRequest)
        })

        return handleResponse(response)
    }

export const verifyLinkedInCredentials =
    async (linkedInCredentialsRequest: LinkedInCredentialsRequest): Promise<void> => {
        const response = await fetch(`${apiUrl}/linkedIn/credentials/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(linkedInCredentialsRequest)
        })

        if (response.status === 200) {
            return Promise.resolve()
        } else {
            return Promise.reject("Invalid LinkedIn credentials")
        }
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