import React, {ChangeEventHandler, HTMLInputTypeAttribute} from "react"
import classNames from "classnames"

interface InputTextFieldParameters {
    readonly label: string
    readonly classNames?: string[]
    readonly type?: HTMLInputTypeAttribute

    readonly value: string
    readonly onChange: ChangeEventHandler<HTMLInputElement>
}

const InputTextField =
    (props: InputTextFieldParameters) =>
        <div className={classNames("input-field", props.classNames)}>
            <label>{ props.label }</label>
            <input className="text-field" type={props.type} value={props.value} onChange={props.onChange}/>
        </div>

export default InputTextField