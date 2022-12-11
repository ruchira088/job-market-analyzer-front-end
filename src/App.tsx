import React from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "./App.css"
import SignupPage from "./pages/signup/SignupPage"
import LoginPage from "./pages/LoginPage"
import LinkedInCredentialsPage from "./pages/LinkedInCredentialsPage"
import JobsPage from "./pages/JobsPage"

const App =
    () =>
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignupPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/jobs" element={<JobsPage/>}/>
                    <Route path="/linkedin/credentials" element={<LinkedInCredentialsPage/>}/>
                </Routes>
            </Router>
        </div>

export default App
