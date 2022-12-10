import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from "./Input.module.css"
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';


type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    const [error, setError] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError(true)
        }
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(false)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       error={error}
                       size={"small"}
                       label={error ? "Title is required" : "add title"}
                       variant="outlined"
                       value={newTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>


            <Button style={{maxWidth: '60px', maxHeight: '38px', minWidth: '60px', minHeight: '38px'}}
                    onClick={addTaskHandler} variant="contained">add</Button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
}