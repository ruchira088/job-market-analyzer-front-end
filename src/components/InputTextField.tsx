import React, {ChangeEvent, ChangeEventHandler, HTMLInputTypeAttribute} from "react"
import classNames from "classnames"

interface InputTextFieldParameters {
    readonly label: string
    readonly className?: string | string[]
    readonly type?: HTMLInputTypeAttribute

    readonly value: string
    readonly onChange: ChangeEventHandler<HTMLInputElement>
}

const InputTextField =
    (props: InputTextFieldParameters) =>
        <div className={classNames(props.className)}>
            <label>{props.label}</label>
            <input type={props.type} value={props.value} onChange={props.onChange}/>
        </div>

export const setValueHook =
    (fn: () => void) => (onValue: (value: string) => void) =>
        (event: ChangeEvent<HTMLInputElement>) => {
            fn()
            onValue(event.target.value)
        }


export default InputTextField