import React from "react"
import classNames from "classnames"
import styles from "./ErrorDisplay.module.scss"

const ErrorMessage =
    (props: { error: string, className?: string | string[] }) =>
        <div className={classNames(styles.errorMessage, props.className)}>
            {props.error}
        </div>

const ErrorDisplay =
    (props: { errors: string[] }) => (
        <div className={styles.errorDisplay}>
            {
                props.errors
                    .map((errorMessage, index) => <ErrorMessage key={index} error={errorMessage}/>)
            }
        </div>
    )

export default ErrorDisplay