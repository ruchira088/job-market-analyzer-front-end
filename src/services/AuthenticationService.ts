import {API_URL} from "../config/ApiConfiguration"
import {AuthenticationToken} from "./models/AuthenticationToken"
import {handleResponse} from "../utils/HttpUtils"

interface LoginRequest {
    readonly email: string
    readonly password: string
}

export const loginUser =
    async (loginRequest: LoginRequest): Promise<AuthenticationToken> => {
        const response = await fetch(`${API_URL}/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest),
            credentials: "include"
        })

        return handleResponse(response)
    }