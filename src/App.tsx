import React, {useEffect, useState} from "react"
import {authenticatedUser} from "./services/AuthenticationService"

import "./App.css"
import AuthenticatedRoutes from "./routes/AuthenticatedRoutes"
import UnauthenticatedRoutes from "./routes/UnauthenticatedRoutes"

const App =
    () => {
        const [isLoading, setLoading] = useState(true)
        const [isAuthenticated, setAuthenticated] = useState(false)

        useEffect(() => {
            authenticatedUser()
                .then(() => setAuthenticated(true))
                .catch(() => setAuthenticated(false))
                .finally(() => setLoading(false))
        }, [])

        if (isLoading) {
            return null
        } else if (isAuthenticated) {
            return <AuthenticatedRoutes/>
        } else {
            return <UnauthenticatedRoutes/>
        }
    }

export default App
