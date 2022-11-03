import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import styles from './Todolist.module.css'
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

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
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
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
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                            <Checkbox defaultChecked checked={t.isDone} onChange={changeCheckBoxHandler}/>
                            <EditableSpan title={t.title} callback={editTaskHandler}/>
                        </li>)
                    })
                }
            </ul>
            <div>

                <Button color={"success"} variant={props.filter === 'all' ? "contained" : "outlined"}
                        onClick={allChangeFilterHandler}>All</Button>
                <Button color={"error"} variant={props.filter === 'active' ? "contained" : "outlined"}
                        onClick={activeChangeFilterHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "outlined"}
                        onClick={completedChangeFilterHandler}>Completed</Button>
            </div>
        </div>
    )
}