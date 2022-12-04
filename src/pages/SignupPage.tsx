import React, {ChangeEvent, MouseEventHandler, useState} from "react"
import InputTextField from "../components/InputTextField"
import ErrorDisplay from "../components/ErrorDisplay"
import {createUser} from "../services/UserService"

const nonEmptyValidator =
    (values: { [key: string]: string }): string[] => Object.entries(values)
        .reduce(
            (acc: string[], entry: [string, string]) => {
                const [key, value] = entry

                if (value.trim().length === 0) {
                    return acc.concat(`${key} cannot be empty`)
                } else {
                    return acc
                }
            },
            []
        )

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
            const allErrors = validate()

            if (allErrors.length === 0) {
                createUser({email, password, firstName, lastName})
            }
        }

    const validate = (): string[] => {
        const emptyErrors: string[] =
            nonEmptyValidator({email, password, "Confirm Password": confirmPassword, "First Name": firstName})

        const passwordErrors =
            password.trim() === confirmPassword.trim() ? [] : ["Password mismatch"]

        const allErrors = emptyErrors.concat(passwordErrors)

        setErrors(allErrors)

        return allErrors
    }

    const setValue =
        (fn: (value: string) => void) =>
            (event: ChangeEvent<HTMLInputElement>) => {
                setErrors([])
                fn(event.target.value)
            }

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

                <button onClick={onSubmit}>Submit</button>
            </div>
            <ErrorDisplay errors={errors}/>
        </div>
    )
}

export default SignupPage

