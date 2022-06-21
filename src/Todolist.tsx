import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {filterValueType} from "./App";
import {Button} from "./components/Button";
import styles from './Todolist.module.css'

type PropsTodolistType = {
    title: string
    tasks: Array<PropsTasks>
    removeTask: (id: string) => void
    changeFilter: (value: filterValueType) => void
    addTask: (newTitle: string) => void
    changeCheckBox: (id: string, value: boolean) => void
    filter: filterValueType
}

type PropsTasks = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: PropsTodolistType) => {

    const [error, setError] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState('')


    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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

    const changeCheckBoxHandler = (elID: string, eventValue: boolean) => {
        props.changeCheckBox(elID, eventValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? styles.error : ''}
                       value={newTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <Button name={'+'} callBack={addTaskHandler}/>
                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el, index) => {
                        return (<li key={el.id} className={el.isDone ? styles.isDone : ''}>
                            <Button name={'X'} callBack={() => removeTaskHandler(el.id)}/>
                            <input type="checkbox" checked={el.isDone}
                                   onChange={(event) => changeCheckBoxHandler(el.id, event.currentTarget.checked)}/>
                            <span>{el.title}</span>
                        </li>)
                    })
                }
            </ul>
            <div>

                <button className={props.filter === 'all' ? styles.activeFilter : ''}
                        onClick={() => mainChangeFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : ''}
                        onClick={() => mainChangeFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : ''}
                        onClick={() => mainChangeFilterHandler('completed')}>Completed
                </button>
                {/*<Button name={'All'} callBack={() => mainChangeFilterHandler("all")}/>
                <Button name={'Active'} callBack={() => mainChangeFilterHandler("active")}/>
                <Button name={'Copleted'} callBack={() => mainChangeFilterHandler("completed")}/>*/}
            </div>
        </div>
    )
}