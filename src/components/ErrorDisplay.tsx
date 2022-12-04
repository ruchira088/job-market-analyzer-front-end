import React from "react"
import classNames from "classnames"

const ErrorMessage =
    (props: { error: string, classNames?: string[] }) =>
        <div className={classNames("error-message", props.classNames)}>
            {props.error}
        </div>

const ErrorDisplay =
    (props: { errors: string[] }) => (
        <div className="error-display">
            {
                props.errors
                    .map((errorMessage, index) => <ErrorMessage key={index} error={errorMessage}/>)
            }
        </div>
    )

export default ErrorDisplay