import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";

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


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((el, index) => {
                        return <li key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("All")}>All</button>
                <button onClick={() => props.changeFilter("Active")}>Active</button>
                <button onClick={() => props.changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}