import {apiUrl} from "../config/ApiConfiguration"
import {AuthenticationToken} from "./models/AuthenticationToken"
import {handleResponse} from "../utils/HttpUtils"
import {User} from "./models/User"

interface LoginRequest {
    readonly email: string
    readonly password: string
}

export const loginUser =
    async (loginRequest: LoginRequest): Promise<AuthenticationToken> => {
        const response = await fetch(`${apiUrl}/authentication`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginRequest),
            credentials: "include"
        })

        return handleResponse(response)
    }

export const authenticatedUser = async (): Promise<User> => {
    const response = await fetch(`${apiUrl}/authentication/user`, {credentials: "include"})

    return handleResponse(response)
}