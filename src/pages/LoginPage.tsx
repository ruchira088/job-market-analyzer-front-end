import React, {MouseEventHandler, useState} from "react"
import InputTextField, {setValueHook} from "../components/InputTextField"
import ErrorDisplay from "../components/ErrorDisplay"
import {nonEmptyValidator} from "../components/Validators"
import {loginUser} from "../services/AuthenticationService"

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errors, setErrors] = useState<string[]>([])

    const setValue = setValueHook(() => setErrors([]))

    const onSubmit: MouseEventHandler<HTMLButtonElement> =
        event => {
            event.preventDefault()
            const validationErrors = nonEmptyValidator({email, password})

            if (validationErrors.length === 0) {
                loginUser({email, password})
                    .catch(error => setErrors([error]))
            } else {
                setErrors(validationErrors)
            }
        }

    return (
        <div className="login-page">
            <div className="login-form">
                <InputTextField label="Email" value={email} onChange={setValue(setEmail)}/>
                <InputTextField label="Password" type="password" value={password} onChange={setValue(setPassword)}/>
                <button onClick={onSubmit}>Login</button>
            </div>
            <ErrorDisplay errors={errors}/>
        </div>
    )

}