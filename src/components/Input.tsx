import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./Input.module.css"


type InputPropsType = {
    callBack: (newTitle: string) => void


}


export const Input = (props: InputPropsType) => {
    const [error, setError] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(event.currentTarget.value)
    }


    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callBack( newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    return (
        <div>
            <input className={error ? styles.error : ''}
                   value={newTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}