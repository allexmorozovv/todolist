import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./components/Button";

type PropsTodolistType = {
    title: string
    tasks: Array<PropsTasks>
    removeTask: (id: string) => void
    changeFilter: (value: filterValueType) => void
    addTask: (newTitle: string) => void
}

type PropsTasks = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    const [newTitle, setNewTitle] = useState()

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const mainChangeFilterHandler = (value: filterValueType) => {
        props.changeFilter(value)
    }

    const removeTaskHandler = (elID: string) => {
        props.removeTask(elID)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <Button name={'+'} callBack={addTaskHandler}/>
            </div>
            <ul>
                {
                    props.tasks.map((el, index) => {
                        return (<li key={el.id}>
                            <Button name={'X'} callBack={() => removeTaskHandler(el.id)}/>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>)
                    })
                }
            </ul>
            <div>


                <Button name={'All'} callBack={() => mainChangeFilterHandler("all")}/>
                <Button name={'Active'} callBack={() => mainChangeFilterHandler("active")}/>
                <Button name={'Copleted'} callBack={() => mainChangeFilterHandler("completed")}/>
            </div>
        </div>
    )
}