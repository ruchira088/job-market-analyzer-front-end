import React, {MouseEventHandler, useState} from "react"
import {Link} from "react-router-dom"
import InputTextField, {setValueHook} from "../../components/InputTextField"
import ErrorDisplay from "../../components/error-display/ErrorDisplay"
import {createUser} from "../../services/UserService"
import {nonEmptyValidator} from "../../utils/Validators"
import styles from "./SignupPage.module.scss"
import {loginUser} from "../../services/AuthenticationService"
import {withRetries} from "../../utils/PromiseUtils"

const SignupPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [errors, setErrors] = useState<string[]>([])

    const onSubmit: MouseEventHandler<HTMLButtonElement> =
        () => {
            const validationErrors = validate()

            if (validationErrors.length === 0) {
                createUser({email, password, firstName, lastName})
                    .catch(error => {
                            setErrors([error])
                            return Promise.reject(errors)
                        }
                    )
                    .then(() => withRetries(() => loginUser({email, password}), 100, 3))
                    .then(() => window.location.replace("/"))
            } else {
                setErrors(validationErrors)
            }
        }

    const validate = (): string[] => {
        const emptyErrors: string[] =
            nonEmptyValidator({
                "Email": email,
                "Password": password,
                "Confirm Password": confirmPassword,
                "First Name": firstName
            })

        const passwordErrors =
            password.trim() === confirmPassword.trim() ? [] : ["Password mismatch"]

        return emptyErrors.concat(passwordErrors)
    }

    const setValue = setValueHook(() => setErrors([]))

    return (
        <div className={styles.signupPage}>
            <div className={styles.signupForm}>
                <InputTextField
                    label="Email"
                    value={email}
                    onChange={setValue(setEmail)}
                    className={styles.inputTextField}/>

                <InputTextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={setValue(setPassword)}
                    className={styles.inputTextField}/>

                <InputTextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={setValue(setConfirmPassword)}
                    className={styles.inputTextField}/>

                <InputTextField
                    label="First Name"
                    value={firstName}
                    onChange={setValue(setFirstName)}
                    className={styles.inputTextField}/>

                <InputTextField
                    label="Last Name"
                    value={lastName}
                    onChange={setValue(setLastName)}
                    className={styles.inputTextField}/>

                <button className={styles.signupButton} onClick={onSubmit}>Signup</button>
                <Link to="/login">Sign In</Link>
                <ErrorDisplay errors={errors}/>
            </div>
        </div>
    )
}

export default SignupPage

