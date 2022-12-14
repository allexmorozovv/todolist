import {Button} from "@mui/material";
import styles from "./Input.module.css"
import TextField from '@mui/material/TextField';
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";


type AddItemFormPropsType = {
    callBack: (newTitle: string) => void
}

export const  AddItemForm = memo ((props: AddItemFormPropsType) => {
    console.log(AddItemForm)
    const [error, setError] = useState(false)
    const [newTitle, setNewTitle] = useState('')

    const addItem = () => {
        if (newTitle.trim() !== '') {
            props.callBack(newTitle.trim())
            setNewTitle('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(false)
        if (event.key === "Enter") {
            addItem()
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
                    onClick={addItem} variant="contained">add</Button>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    )
})