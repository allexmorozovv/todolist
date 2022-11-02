import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import styles from './Todolist.module.css'
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";

export type PropsTodolistType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (todoListId: string, value: FilterValueType) => void
    addTask: (todoListId: string, newTitle: string) => void
    changeCheckBox: (todoListId: string, id: string, value: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    editTask: (todolistId: string, taskId: string, newTitle: string) => void
    editTodolist: (todolistId: string, newTodolistTitle: string) => void
}


export const Todolist = (props: PropsTodolistType) => {


    // const mainChangeFilterHandler = (value: FilterValueType) => {
    //     props.changeFilter(value)
    // }
    const allChangeFilterHandler = () => props.changeFilter(props.todolistId, 'all')

    const activeChangeFilterHandler = () => props.changeFilter(props.todolistId, 'active')

    const completedChangeFilterHandler = () => props.changeFilter(props.todolistId, 'completed')

    const removeTodolistHandler = () => props.removeTodolist(props.todolistId)

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }
    const editTodolistHundler = (newTitle: string) => {
        props.editTodolist(props.todolistId, newTitle)
    }
    // const editTaskHandler = (tID:string,newTitle: string) => {
    //     props.editTask(props.todolistId, tID, newTitle)
    // }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={editTodolistHundler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>

            <Input callBack={addTaskHandler}/>

            <ul>
                {
                    props.tasks.map((t, index) => {
                        const removeTaskHandler = () => props.removeTask(props.todolistId, t.id)
                        const changeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBox(props.todolistId, t.id, e.currentTarget.checked)
                        }
                        const editTaskHandler = (newTitle: string) => {
                            props.editTask(props.todolistId, t.id, newTitle)
                        }

                        return (<li key={t.id} className={t.isDone ? styles.isDone : ''}>
                            <button onClick={removeTaskHandler}>X</button>
                            <input type="checkbox" checked={t.isDone}
                                   onChange={changeCheckBoxHandler}/>
                            <EditableSpan title={t.title} callback={editTaskHandler}/>
                        </li>)
                    })
                }
            </ul>
            <div>

                <button className={props.filter === 'all' ? styles.activeFilter : ''}
                        onClick={allChangeFilterHandler}>All
                </button>
                <button className={props.filter === 'active' ? styles.activeFilter : ''}
                        onClick={activeChangeFilterHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? styles.activeFilter : ''}
                        onClick={completedChangeFilterHandler}>Completed
                </button>
            </div>
        </div>
    )
}