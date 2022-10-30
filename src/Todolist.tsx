import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import {Button} from "./components/Button";
import styles from './Todolist.module.css'

type PropsTodolistType = {
    todolistId:string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string,id: string) => void
    changeFilter: (todoListId: string,value: FilterValueType) => void
    addTask: (todoListId: string,newTitle: string) => void
    changeCheckBox: (todoListId: string,id: string, value: boolean) => void
    filter: FilterValueType
    // removeTodolist:(todolistId:string)=>void
}



export const Todolist = (props: PropsTodolistType) => {

    const [error, setError] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState('')


    const addTaskHandler = () => {
        // if (newTitle.trim() !== '') {
        //     props.addTask(newTitle.trim())
        //     setNewTitle('')
        // } else {
        //     setError('Title is required')
        // }
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

    // const mainChangeFilterHandler = (value: FilterValueType) => {
    //     props.changeFilter(value)
    // }
    const allChangeFilterHandler = () => {
        props.changeFilter(props.todolistId,'all')
    }
    const activeChangeFilterHandler = () => {
        props.changeFilter(props.todolistId,'active')
    }
    const completedChangeFilterHandler = () => {
        props.changeFilter(props.todolistId,'completed')
    }

    const removeTaskHandler = (elID: string) => {
        // props.removeTask(elID)
    }

    const changeCheckBoxHandler = (elID: string, eventValue: boolean) => {
        // props.changeCheckBox(elID, eventValue)
    }
    // const removeTodolistHandler = () => {
    //     props.removeTodolist(props.todolistId)
    // }

    return (
        <div>
            <h3>{props.title}<button >X</button></h3>
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
                        onClick={allChangeFilterHandler}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : ''}
                        onClick={ activeChangeFilterHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : ''}
                        onClick={ completedChangeFilterHandler}>Completed
                </button>
            </div>
        </div>
    )
}