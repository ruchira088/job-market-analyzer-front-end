import React, {MouseEventHandler, useEffect, useState} from "react"
import {LinkedInCredentials} from "../services/models/LinkedInCredentials"
import {fetchLinkedInCredentials, insertLinkedInCredentials} from "../services/LinkedInCredentialsService"
import ErrorDisplay from "../components/error-display/ErrorDisplay"
import InputTextField, {setValueHook} from "../components/InputTextField"
import {nonEmptyValidator} from "../utils/Validators"
import {Link} from "react-router-dom"

interface LinkedInCredentialsFormParameters {
    readonly email?: string
    readonly password?: string
    readonly onSuccess: () => void
    readonly onCancel: () => void
}

const LinkedInCredentialsForm = (props: LinkedInCredentialsFormParameters) => {
    const [email, setEmail] = useState(props.email || "")
    const [password, setPassword] = useState(props.password || "")
    const [errors, setErrors] = useState<string[]>([])

    const setValue = setValueHook(() => setErrors([]))

    const onSubmit: MouseEventHandler<HTMLButtonElement> =
        () => {
            const validationErrors = nonEmptyValidator({email, password})

            if (validationErrors.length === 0) {
                insertLinkedInCredentials({email, password})
                    .then(() => props.onSuccess())
                    .catch(errorResponse => setErrors([errorResponse]))
            } else {
                setErrors(validationErrors)
            }
        }

    return (
        <div className="linkedin-credentials-form">
            <InputTextField label="LinkedIn Email" value={email} onChange={setValue(setEmail)}/>
            <InputTextField label="LinkedIn Password" value={password} onChange={setValue(setPassword)}/>
            <button onClick={onSubmit}>OK</button>
            <button onClick={props.onCancel}>Cancel</button>
            <ErrorDisplay errors={errors}/>
        </div>
    )
}

const CredentialsView =
    (props: { credentials: LinkedInCredentials, onCredentialsUpdated: () => void }) => {
        const [showCredentialsForm, setShowCredentialsForm] = useState(false)

        if (!showCredentialsForm) {
            return (
                <div>
                    <div className="property">
                        <label className="property-name">User ID</label>
                        <label className="property-value">{props.credentials.userId}</label>
                    </div>
                    <div className="property">
                        <label className="property-name">Email</label>
                        <label className="property-value">{props.credentials.email}</label>
                    </div>
                    <div className="property">
                        <label className="property-name">Password</label>
                        <label className="property-value">**************</label>
                    </div>
                    <button onClick={() => setShowCredentialsForm(true)}>Edit</button>
                </div>
            )
        } else {
            return <LinkedInCredentialsForm
                email={props.credentials.email}
                password={props.credentials.password}
                onSuccess={props.onCredentialsUpdated}
                onCancel={() => setShowCredentialsForm(false)}/>
        }
    }

const NoCredentialsView = (props: { onCredentialsCreated: () => void }) => {
    const [showCredentialsForm, setShowCredentialsForm] = useState(false)

    if (!showCredentialsForm) {
        return <button onClick={() => setShowCredentialsForm(true)}>Add LinkedIn Credentials</button>
    } else {
        return <LinkedInCredentialsForm
            onSuccess={props.onCredentialsCreated}
            onCancel={() => setShowCredentialsForm(false)}/>
    }
}

const LinkedInCredentialsPage = () => {
    const [linkedInCredentials, setLinkedInCredentials] = useState<LinkedInCredentials | null>(null)
    const [isReady, setIsReady] = useState(false)
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        loadCredentials()
    }, [])

    const loadCredentials = () => {
        setIsReady(false)

        return fetchLinkedInCredentials()
            .then(linkedInCredentials => setLinkedInCredentials(linkedInCredentials))
            .catch(errors => setErrors([].concat(errors)))
            .finally(() => setIsReady(true))
    }

    const content = () => {
        if (isReady) {
            if (errors.length > 0) {
                return <ErrorDisplay errors={errors}/>
            } else if (linkedInCredentials !== null) {
                return <CredentialsView credentials={linkedInCredentials} onCredentialsUpdated={loadCredentials}/>
            } else {
                return <NoCredentialsView onCredentialsCreated={loadCredentials}/>
            }
        } else {
            return <div>Loading</div>
        }
    }

    return (
        <div>
            { content() }
        </div>
    )
}

export default LinkedInCredentialsPage