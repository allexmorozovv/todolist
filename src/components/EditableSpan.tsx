import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    callback: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onClickHandler = () => {
        setEdit(!edit)
        props.callback(newTitle)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)


    }


    return (
        edit
            ? <input value={newTitle} onBlur={onClickHandler} autoFocus onChange={onChangeHandler}/>
            : <span onClick={onClickHandler}>{props.title}</span>
    )
}