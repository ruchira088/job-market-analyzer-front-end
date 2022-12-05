import {API_URL} from "../config/ApiConfiguration"
import {User} from "./models/User"
import {handleResponse} from "../utils/HttpUtils"

interface CreateUserRequest {
    readonly email: string
    readonly password: string
    readonly firstName: string
    readonly lastName?: string
}

export const createUser =
    async (createUserRequest: CreateUserRequest): Promise<User> => {
        const response =
            await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(createUserRequest)
            })

        return handleResponse(response)
    }