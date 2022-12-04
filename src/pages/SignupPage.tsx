import React, {MouseEventHandler, useState} from "react"
import InputTextField, {setValueHook} from "../components/InputTextField"
import ErrorDisplay from "../components/ErrorDisplay"
import {createUser} from "../services/UserService"
import {nonEmptyValidator} from "../components/Validators"

const SignupPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [errors, setErrors] = useState<string[]>([])

    const onSubmit: MouseEventHandler<HTMLButtonElement> =
        event => {
            event.preventDefault()
            const validationErrors = validate()

            if (validationErrors.length === 0) {
                createUser({email, password, firstName, lastName})
            } else {
                setErrors(validationErrors)
            }
        }

    const validate = (): string[] => {
        const emptyErrors: string[] =
            nonEmptyValidator({email, password, "Confirm Password": confirmPassword, "First Name": firstName})

        const passwordErrors =
            password.trim() === confirmPassword.trim() ? [] : ["Password mismatch"]

        return emptyErrors.concat(passwordErrors)
    }

    const setValue = setValueHook(() => setErrors([]))

    return (
        <div className="signup-page">
            <div className="signup-form">
                <InputTextField
                    label="Email"
                    value={email} onChange={setValue(setEmail)}/>

                <InputTextField
                    label="Password" type="password"
                    value={password} onChange={setValue(setPassword)}/>

                <InputTextField
                    label="Confirm Password" type="password"
                    value={confirmPassword} onChange={setValue(setConfirmPassword)}/>

                <InputTextField
                    label="First Name"
                    value={firstName} onChange={setValue(setFirstName)}/>

                <InputTextField
                    label="Last Name"
                    value={lastName} onChange={setValue(setLastName)}/>

                <button onClick={onSubmit}>Signup</button>
            </div>
            <ErrorDisplay errors={errors}/>
        </div>
    )
}

export default SignupPage

