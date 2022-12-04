import {API_URL} from "../config/ApiConfiguration"
import {ErrorResponse} from "./models/ErrorResponse"

interface LoginRequest {
    readonly email: string
    readonly password: string
}

export const loginUser =
    async (loginRequest: LoginRequest) => {
        const response = await fetch(`${API_URL}/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest)
        })

        const body = await response.json()

        if (response.status === 201) {
            return body
        } else {
            const errorResponse = body as unknown as ErrorResponse
            return Promise.reject(errorResponse.errorMessage)
        }
    }